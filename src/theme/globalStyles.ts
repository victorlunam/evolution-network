import { globalCss } from "@nextui-org/react";

const globalStyles = globalCss({
  body: {
    fontFamily: "Mont",
  },
  "@font-face": [
    // Bold
    {
      fontFamily: "Mont",
      src: 'url("/fonts/Mont-Bold.woff") format("woff")',
      fontWeight: "700",
    },
    {
      fontFamily: "Mont",
      src: 'url("/fonts/Mont-BoldItalic.woff") format("woff")',
      fontWeight: "700",
      fontStyle: "italic",
    },
    // SemiBold
    {
      fontFamily: "Mont",
      src: 'url("/fonts/Mont-SemiBold.woff") format("woff")',
      fontWeight: "600",
    },
    {
      fontFamily: "Mont",
      src: 'url("assets/fonts/Mont-SemiBoldItalic.woff") format("woff")',
      fontWeight: "600",
      fontStyle: "italic",
    },
    // Regular
    {
      fontFamily: "Mont",
      src: 'url("/fonts/Mont-Regular.woff") format("woff")',
      fontWeight: "400",
    },
    {
      fontFamily: "Mont",
      src: 'url("/fonts/Mont-RegularItalic.woff") format("woff")',
      fontWeight: "400",
      fontStyle: "italic",
    },
    // Book
    {
      fontFamily: "Mont",
      src: 'url("/fonts/Mont-Book.woff") format("woff")',
      fontWeight: "300",
    },
    {
      fontFamily: "Mont",
      src: 'url("/fonts/Mont-BookItalic.woff") format("woff")',
      fontWeight: "300",
      fontStyle: "italic",
    },
  ],
});

export default globalStyles;
