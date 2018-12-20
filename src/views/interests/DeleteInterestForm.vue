<template>
  <div>
    <v-dialog
      :value="visible"
      @input="close()"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="headline">Edit Interest Form</v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="editInterestForm" v-model="valid" lazy-validation autocomplete="off">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Title"
                                v-model="name"
                                :rules="rules.name"
                                required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="close()"
          >
            Отменить
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="save()"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      rules: {
        name: [
          v => !!v || 'Name is required'
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
