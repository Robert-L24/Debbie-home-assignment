import { cva, type VariantProps } from "class-variance-authority";
import { Pressable, Text } from "react-native";
import { twMerge } from "tailwind-merge";
import React from "react";

const buttonStyles = cva(
  "rounded-2xl items-center justify-center active:opacity-90",
  {
    variants: {
      variant: {
        primary: "bg-brand",
        secondary: "bg-gray-100",
        destructive: "bg-red-500"
      },
      size: {
        sm: "h-10 px-4",
        md: "h-12 px-5",
        lg: "h-14 px-6"
      },
      disabled: {
        true: "opacity-50",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      disabled: false
    }
  }
);

const textStyles = cva("font-semibold", {
  variants: {
    variant: {
      primary: "text-white",
      secondary: "text-gray-700",
      destructive: "text-white"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md"
  }
});

export type ButtonProps = React.PropsWithChildren<
  VariantProps<typeof buttonStyles> & {
    onPress?: () => void;
    disabled?: boolean;
    testID?: string;
  }
>;

export function Button({
  children,
  variant,
  size,
  disabled,
  onPress,
  testID
}: ButtonProps) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      className={twMerge(buttonStyles({ variant, size, disabled }))}
      accessibilityRole="button"
      testID={testID}
    >
      <Text className={twMerge(textStyles({ variant, size }))}>{children}</Text>
    </Pressable>
  );
}