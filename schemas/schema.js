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

          validation: (Rule) => [
            Rule.required()
              .min(10)
              .error("Гарчиг хамгийн багадаа 10н тэмдэгтээс бүрдэнэ"),
            Rule.max(50).warning(
              "Гарчиг богинохон байх хэрэгтэй (80 тэмдэгтээс хэтрэхгүй)"
            ),
          ],
        },
        {
          title: "Дэд гарчиг",
          name: "subTitle",
          type: "string",
          description: "Постын төрлийг тэкстээр бичих",
        },
        {
          title: "Нийтлэгч",
          name: "publisher",
          type: "reference",
          to: [{ type: "publisher" }],
        },
        {
          title: "Постын зураг",
          name: "cover_image",
          type: "image",
          fields: [
            {
              title: "Зургын тайлбар",
              name: "alt",
              type: "text",
              options: {
                isHighlighted: true,
              },
            },
          ],
          options: {
            hotspot: true,
          },
        },
        {
          name: "content",
          type: "array",
          title: "Постын агуулга",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  title: "Зургын тайлбар",
                  name: "alt",
                  type: "text",
                  options: {
                    isHighlighted: true,
                  },
                },
                {
                  title: "Зургын байрлал",
                  name: "position",
                  type: "string",
                  options: {
                    isHighlighted: true,
                    list: [
                      {
                        title: "Голлулж",
                        value: "center",
                      },
                      {
                        title: "Баруун талд",
                        value: "right",
                      },
                      {
                        title: "Зүүн талд",
                        value: "left",
                      },
                    ],
                    layout: "radio",
                  },
                },
              ],
              options: {
                hotspot: true,
              },
            },
            {
              type: "code",
              options: {
                title: "Файлын нэр",
                withFilename: true,
              },
            },
          ],
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
    {
      title: "Нийтлэгч",
      name: "publisher",
      type: "document",
      fields: [
        {
          title: "Нийтлэгчийн нэр",
          type: "string",
          name: "publisherName",
        },
        {
          title: "Нийтлэгчийн зураг",
          type: "image",
          name: "picture",
        },
      ],
    },
  ]),
});
