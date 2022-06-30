// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
      title: "Постууд",
      name: "post",
      type: "document",
      fields: [
        {
          title: "Постын гарчиг",
          name: "title",
          type: "string",
          description: "Блогын үндсэн гарчиг 50 тэмдэгтээс бүү хэтрүүлээрэй",
        },
        {
          title: "Дэд гарчиг",
          name: "subTitle",
          type: "string",
          description: "Постын төрлийг тэкстээр бичих",
        },
        {
          title: "Постын зураг",
          name: "cover_image",
          type: "image",
        },
        {
          title: "Огноо",
          name: "date",
          type: "datetime",
        },
        {
          title: "Хаяг",
          name: "slug",
          type: "slug",
          options: {
            source: "title",
            slugify: (input) =>
              input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
          },
        },
      ],
    },
  ]),
});
