<template>
  <v-dialog
    :value="visible"
    @input="close()"
  >
    <v-card>
      <v-card-title>Interest edit form</v-card-title>
      <v-card-text>
        <v-form ref="editInterestForm" v-model="valid" lazy-validation autocomplete="off">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Name" required
                  v-model="interestName"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
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
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: "EditInterestForm",
  watch: {
    visible(value) {
      if (!!value && this.isNew) {
        this.$refs.editInterestForm.reset()
      }
    }
  },
  data() {
    return {
      valid: true,
      rules: {
        age: [
          v => v > 10 || `I don't believe you!`
        ],
        name: [
          v => (v || '').length > 0 || 'This field is required'
        ]
      },
    }
  },
  computed: {
    ...mapState({
      visible: state => state.editInterest.editForm.visible,
      isNew: state => !state.editInterest.main.id,
      errorText: state => state.editInterest.errorText
    }),
    interestName: {
      get() {
        return this.$store.state.editInterest.main.name
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_INTEREST_NAME, value)
      }
    },
    ...mapGetters({
      interests: 'getAllInterests'
    })
  },
  methods: {
    save() {
      if (this.$refs.editInterestForm.validate()) {
        this.$store.dispatch('saveEditInterest')
      }
    },
    close() {
      this.$store.dispatch('closeEditInterestForm')
      this.$refs.editInterestForm.reset()
    }
  }
}
</script>

