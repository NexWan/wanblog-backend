import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "blogContent",
  access: (allow) => ({
    "drafts/*": [allow.groups(["admin"]).to(["read", "write", "delete"])],
    "blogs/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read"]),
      allow.groups(["admin"]).to(["read", "write", "delete"]),
    ],
    "profiles/avatar/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
      allow.groups(["admin"]).to(["read", "write", "delete"]),
      allow.guest.to(["read"]),
    ],
  }),
});
