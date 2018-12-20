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
                @click="setCurrentAuthor(author)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ interest.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <!--<v-flex xs12 md4>-->
          <!--<div class="text-xs-center" v-if="currentAuthor !== false">-->
            <!--<v-avatar size="125px">-->
              <!--<img-->
                <!--class="img-circle elevation-7 mb-1"-->
                <!--src="../assets/icon.jpg"-->
              <!--&gt;-->
            <!--</v-avatar>-->
            <!--<div class="headline">{{ currentAuthor.name }}</div>-->
            <!--<v-btn flat small color="primary" @click="openEditForm(currentAuthor.id, authorInterest)">Edit</v-btn>-->
            <!--<v-btn flat small color="error" @click="openDeleteForm(currentAuthor.id)">Delete</v-btn>-->
            <!--<div class="subheading text-xs-center grey&#45;&#45;text pt-1 pb-3">({{ currentAuthor.age }}), {{ currentAuthor.sex }}-->
            <!--</div>-->
            <!--<v-layout justify-space-between v-for="interest in authorInterest" :key="interest.name">-->
              <!--{{ interest.name }}-->
            <!--</v-layout>-->
          <!--</div>-->
        <!--</v-flex>-->
      </v-layout>
    </v-container>
    <v-btn fab dark color="indigo" absolute bottom right @click="openEditForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
  </v-content>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Interest",
  computed: {
    ...mapGetters({
      interests: 'getAllInterests'
    })
  },
  created() {
    this.$store.dispatch('fetchInterests')
  }
}
</script>
