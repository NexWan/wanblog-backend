import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "blogContent",
  access: (allow) => ({
    "blogs/*": [
      allow.guest.to(["read"]),
    ],
  }),
});
