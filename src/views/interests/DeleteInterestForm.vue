<template>
  <div>
    <v-dialog
      :value="visible"
      @input="close()"
    >
      <v-card>
        <v-card-title class="headline">Please confirm</v-card-title>
        <v-card-text>
          Are you sure you want to delete this interest?
          <div class="mt-3 text-xs-right caption red--text" v-show="errorText.length > 0" v-text="errorText"></div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="close()"
          >
            Disagree
          </v-btn>
          <v-btn
            color="red darken-2"
            flat="flat"
            @click="deleteInterest()"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DeleteInterestForm',
  computed: {
    ...mapState({
      visible: state => state.editInterest.deleteForm.visible,
      errorText: state => state.editInterest.errorText
    })
  },
  methods: {
    ...mapActions({
      close: 'closeDeleteInterestForm',
      deleteInterest: 'deleteInterest'
    })
  }
}
</script>

<style scoped>

</style>
