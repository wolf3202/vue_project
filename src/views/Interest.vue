<template>
  <v-content>
    <v-container>
      <v-layout row wrap align-center>
        <v-flex xs12 md5 offset-md2>
          <v-navigation-drawer permanent right>
            <v-toolbar flat>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title class="title">
                    Interests
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list dense class="pt-0">
              <v-list-tile
                v-for="interest in interests"
                :key="interest.name"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ interest.name }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple @click="openEditForm(interest.id)">
                    <v-icon color="grey lighten-1">edit</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon ripple @click="openDeleteForm(interest.id)">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn fab dark color="indigo" absolute bottom right @click="openEditForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
    <edit-interest-form/>
    <delete-interest-form/>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditInterestForm from '@/views/interests/EditInterestForm'
import DeleteInterestForm from '@/views/interests/DeleteInterestForm'

export default {
  components: {
    EditInterestForm: EditInterestForm,
    DeleteInterestForm: DeleteInterestForm
  },
  name: "Interest",
  data() {
    return {
      isLoaded: false
    }
  },
  computed: {
    ...mapGetters({
      interests: 'getAllInterests'
    })
  },
  created() {
    Promise
      .all([
        this.$store.dispatch('fetchInterests')
      ])
      .then(() => {
        this.isLoaded =true
      })
  },
  methods: {
    ...mapActions({
      openEditForm: 'openEditInterestForm',
      closeEditForm: 'closeEditInterestForm',
      openDeleteForm: 'openDeleteInterestForm'
    })
  }
}
</script>
