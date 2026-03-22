import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "blogContent",
  access: (allow) => ({
    "drafts/*": [allow.groups(["admin"]).to(["read", "write", "delete"])],
    "blogs/*": [
      allow.guest.to(["read"]),
      allow.groups(["admin"]).to(["read", "write", "delete"]),
    ],
  }),
});
