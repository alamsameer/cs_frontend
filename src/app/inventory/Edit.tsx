"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/use-toast"; // import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const formSchema = z.object({
  date: z.date({
    required_error: "A date is required",
  }),
  party: z.string(),
  category: z.string(),
  weight: z.coerce.number().optional(),
  rate: z.coerce.number().default(0),
  rent: z.coerce.number(),
  rentStatus: z.string().default("false"),
  lotNumber: z.string(),
  quantity: z.coerce.number().default(0),
  //   remainingQuantity: z.number(),
  location: z.string().optional(),
  remarks: z.string().optional(),
  //   additionalCharges: z.number().default(0),
});

interface Inventory {
  _id: string;
  date: Date;
  organization: string;
  party: string;
  category: string;
  rate: number;
  rent: number;
  rentStatus: boolean;
  lotNumber: string;
  quantity: number;
  remainingQuantity: number;
  location: string;
  remarks: string;
  additionalCharges: number;
  __v: number;
}
interface Party {
    _id: string;
    name: string;
    type: string;
    address: string;
    contact: number;
    organization: string;
    __v: number;
  }
export default function InwardForm({ data }: { data: Inventory }) {
  const [parties, setParties] = useState([]);
  const [total, setTotal] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const accessToken = localStorage.getItem("cstoken");
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("http://localhost:4000/api/movein", data, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      console.log(res);

      toast.success("Success Notification !");

      console.log("submitted", data);
    } catch (e) {
      toast.error("not successful");
    }
  }

  const fetchParties = async () => {
    const token = localStorage.getItem("cstoken");
    try {
      const response = await axios.get("http://localhost:4000/api/allparty", {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = response.data;
      setParties(data.parties);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchParties();
    };

    fetchData();
  }, []);

useEffect(() => {
    // Check if data exists and populate the form fields
    if (data) {
        Object.keys(data).forEach((key) => {
          console.log(key)
            // form.setValue(key as keyof Inventory, data[key as keyof Inventory]);
    })}
}, [data, form]);
const [rate = 0, quantity = 0] = form.watch(["rate", "quantity"]);

  useEffect(() => {
    const calculateTotalRent = () => {
      const calculatedTotal =
        parseInt(rate.toString()) * parseInt(quantity.toString());
      form.setValue("rent", calculatedTotal);
      setTotal(calculatedTotal);
    };

    calculateTotalRent();
  }, [form, quantity, rate]);
  console.log(total);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-56  lg:w-96"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        {/* <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /> */}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="party"
            render={({ field }) => (
              <FormItem>
                <FormLabel>party</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified party" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* write fn to get all party dynmaic */}
                    {parties &&
                      parties.map((party: Party) => {
                        return (
                          <SelectItem value={party._id}>
                            {party.name}
                          </SelectItem>
                        );
                      })}
                    {parties.length === 0 && (
                      <SelectItem value="no party">No party found</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>weight</FormLabel>
                <FormControl>
                  <Input placeholder="enter weight" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>rate</FormLabel>
                <FormControl>
                  <Input placeholder="rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>quantity</FormLabel>
                <FormControl>
                  <Input placeholder="quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>Total Rent: {isNaN(total) ? 0 : total}</div>
          <FormField
            control={form.control}
            name="rentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>rentStatus</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a rent Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* write fn to get all party dynmaic */}
                    <SelectItem value="false">false</SelectItem>
                    <SelectItem value="true">true</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lotNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>lotNumber</FormLabel>
                <FormControl>
                  <Input placeholder="lotNumber" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>location</FormLabel>
                <FormControl>
                  <Input placeholder="location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>remarks</FormLabel>
                <FormControl>
                  <Input placeholder="remarks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <ToastContainer />
    </>
  );
}
