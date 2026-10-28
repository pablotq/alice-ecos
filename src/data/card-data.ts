function defineSchema() {
  const fields = foundry.data.fields;

  return {
    suit: new fields.StringField({
      required: true,
      nullable: false,
      initial: "Copas",
      choices: ["Copas", "Ouro", "Paus", "Espadas"]
    }),
    category: new fields.StringField({
      required: true,
      nullable: false,
      initial: "Forma",
      choices: ["Forma", "Mente", "Devaneio", "Defeito"]
    }),
    slot: new fields.StringField({
      required: true,
      nullable: false,
      initial: "forma",
      choices: ["forma", "mente", "devaneio", "defeito"]
    }),
    description: new fields.StringField({
      required: true,
      nullable: false,
      initial: ""
    }),
    effect: new fields.StringField({
      required: true,
      nullable: false,
      initial: ""
    }),
    notes: new fields.StringField({
      required: true,
      nullable: false,
      initial: ""
    })
  };
}

export class CardData extends foundry.abstract.TypeDataModel<
  ReturnType<typeof defineSchema>,
  Item.Implementation
> {
  static defineSchema = defineSchema;
}
