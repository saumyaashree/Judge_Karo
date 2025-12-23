"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { getRecommendations } from "@/lib/actions";
import type { Questionnaire, UserAnswers } from "@/lib/types";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Label as ShadcnLabel } from "@/components/ui/label";

// Dynamically create a Zod schema from the questionnaire
const createSchema = (questionnaire: Questionnaire) => {
  const shape: { [key: string]: z.ZodType<any, any> } = {};
  questionnaire.questions.forEach((q) => {
    if (q.type === "radio") {
      shape[q.id] = z.string({
        required_error: "Please select an option.",
      });
    } else if (q.type === 'slider') {
      shape[q.id] = z.number().min(q.min!).max(q.max!);
    }
  });
  return z.object(shape);
};

export default function QuestionnaireForm({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) {
  const [isPending, startTransition] = useTransition();
  const FormSchema = createSchema(questionnaire);

  const defaultValues: Partial<UserAnswers> = {};
  questionnaire.questions.forEach(q => {
    if (q.type === 'slider') {
        defaultValues[q.id] = q.defaultValue;
    }
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
        getRecommendations(data, questionnaire.sector);
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {questionnaire.questions.map((question, index) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold">
                      {index + 1}. {question.text}
                    </FormLabel>
                    <FormControl>
                      {question.type === "radio" ? (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {question.options?.map((option) => (
                            <FormItem key={option.value} className="space-y-0">
                                <FormControl>
                                    <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} className="peer sr-only" />
                                </FormControl>
                                <ShadcnLabel
                                    htmlFor={`${question.id}-${option.value}`}
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                    {option.label}
                                </ShadcnLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      ) : question.type === "slider" ? (
                        <div className="pt-2">
                           <Slider
                                onValueChange={(value) => field.onChange(value[0])}
                                defaultValue={[field.value as number]}
                                min={question.min}
                                max={question.max}
                                step={question.step}
                            />
                            <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>{question.labels?.min}</span>
                                <span className="text-primary font-bold">{question.id === 'budget' && '₹'}{field.value}</span>
                                <span>{question.labels?.max}</span>
                            </div>
                        </div>
                      ) : null}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Analyzing..." : "Get My Recommendations"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
