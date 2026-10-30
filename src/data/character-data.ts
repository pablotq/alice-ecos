function defineSchema() {
  const fields = foundry.data.fields;

  return {
    alice: new fields.StringField({ 
      required: true, 
      nullable: false, 
      initial: "" 
    }),
    vivencia: new fields.StringField({ 
      required: true, 
      nullable: false, 
      initial: "" 
    }),
    attributes: new fields.SchemaField({
      form: new fields.NumberField({ 
        required: true, 
        nullable: false, 
        integer: true, 
        min: 1, 
        max: 4, 
        initial: 1 
      }),
      logic: new fields.NumberField({ 
        required: true, 
        nullable: false, 
        integer: true, 
        min: 1, 
        max: 4, 
        initial: 1 
      }),
      dream: new fields.NumberField({ 
        required: true, 
        nullable: false, 
        integer: true, 
        min: 1, 
        max: 4, 
        initial: 1 
      })
    }),
    suits: new fields.SchemaField({
      form: new fields.StringField({
        required: true,
        nullable: false,
        initial: "Copas",
        choices: ["Copas", "Ouro", "Paus", "Espadas"]
      }),
      logic: new fields.StringField({
        required: true,
        nullable: false,
        initial: "Ouro",
        choices: ["Copas", "Ouro", "Paus", "Espadas"]
      }),
      dream: new fields.StringField({
        required: true,
        nullable: false,
        initial: "Paus",
        choices: ["Copas", "Ouro", "Paus", "Espadas"]
      }),
      defect: new fields.StringField({
        required: true,
        nullable: false,
        initial: "Espadas",
        choices: ["Copas", "Ouro", "Paus", "Espadas"]
      })
    }),
    integrity: new fields.SchemaField({
      form: new fields.NumberField({ 
        required: true, 
        nullable: false, 
        integer: true, 
        min: 0, 
        max: 3, 
        initial: 0 
      }),
      logic: new fields.NumberField({ 
        required: true, 
        nullable: false, 
        integer: true, 
        min: 0, 
        max: 3, 
        initial: 0 
      }),
      dream: new fields.NumberField({ 
        required: true, 
        nullable: false, 
        integer: true, 
        min: 0, 
        max: 3, 
        initial: 0 
      })
    }),
    cards: new fields.ArrayField(
      new fields.SchemaField({
        id: new fields.StringField({
          required: true, 
          nullable: false,
          initial: ""
        }),
        uuid: new fields.StringField({
          required: true, 
          nullable: false,
          initial: ""
        }),
        name: new fields.StringField({
          required: true, 
          nullable: false,
          initial: ""
        }),
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
          initial: "form",
          choices: ["form", "logic", "dream", "defect"]
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
      }),
      {
        required: true,
        initial: []
      }
    ),
    notes: new fields.StringField({ 
      required: true, 
      nullable: false, 
      initial: "" 
    })
  };
}

export class CharacterData extends foundry.abstract.TypeDataModel<
  ReturnType<typeof defineSchema>,
  Actor.Implementation
> {
  static defineSchema = defineSchema;
}
