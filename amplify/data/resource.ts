import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  BlogStatus: a.enum(["DRAFT", "PUBLISHED"]),

  Blog: a
    .model({
      blogId: a.id().required(),
      title: a.string().required(),
      slug: a.string().required(),
      excerpt: a.string(),
      tags: a.string().array(),
      contentPath: a.string().required(),
      coverImagePath: a.string(),
      authorName: a.string().required(),
      authorUserId: a.string().required(),
      status: a.ref("BlogStatus").required(),
      publishedAt: a.datetime(),
    })
    .identifier(["blogId"])
    .secondaryIndexes((index) => [
      index("slug").queryField("listBlogsBySlug"),
      index("status").sortKeys(["publishedAt"]).queryField("listBlogsByStatus"),
    ])
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.group("admin").to(["create", "read", "update", "delete"]),
    ]),

  Comment: a
    .model({
      blogId: a.id().required(),
      authorName: a.string().required(),
      authorUserId: a.string().required(),
      content: a.string().required(),
    })
    .secondaryIndexes((index) => [
      index("blogId").queryField("listCommentsByBlogId"),
    ])
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create"]),
      allow.owner().to(["update", "delete"]),
      allow.group("admin").to(["delete"]),
    ]),

  Like: a
    .model({
      blogId: a.id().required(),
      userId: a.string().required(),
    })
    .identifier(["blogId", "userId"])
    .secondaryIndexes((index) => [index("blogId").queryField("listLikesByBlogId")])
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.authenticated().to(["create"]),
      allow.owner().to(["delete", "read"]),
      allow.group("admin").to(["read", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "identityPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
});
