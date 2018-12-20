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
                    Authors
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">
              <v-list-tile
                v-for="author in authors"
                :key="author.name"
                @click="setCurrentAuthor(author)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ author.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex xs12 md4>
          <div class="text-xs-center" v-if="currentAuthor !== false">
            <v-avatar size="125px">
              <img
                class="img-circle elevation-7 mb-1"
                src="../assets/icon.jpg"
              >
            </v-avatar>
            <div class="headline">{{ currentAuthor.name }}</div>
            <v-btn flat small color="primary" @click="openEditForm(currentAuthor.id)">Edit</v-btn>
            <v-btn flat small color="error" @click="openDeleteForm(currentAuthor.id)">Delete</v-btn>
            <div class="subheading text-xs-center grey--text pt-1 pb-3">({{ currentAuthor.age }}), {{ currentAuthor.sex }}
            </div>
            <v-layout justify-space-between v-for="interestId in currentAuthor.interestIds" :key="interestId">
              {{ interest(interestId).name }}
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn fab dark color="indigo" absolute bottom right @click="openEditForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
    <EditAuthorForm/>
    <DeleteAuthorForm/>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditAuthorForm from '@/views/authors/EditAuthorForm'
import DeleteAuthorForm from '@/views/authors/DeleteAuthorForm'
import * as types from '@/store/mutation-types'

export default {
  components: {
    EditAuthorForm: EditAuthorForm,
    DeleteAuthorForm: DeleteAuthorForm
  },
  data() {
    return {
      isLoaded: false,
      items: ['male', 'female']
    }
  },
  computed: {
    ...mapGetters({
      articles: 'getAllArticles',
      authors: 'getAllAuthors',
      interest: 'getInterestById',
      currentAuthor: 'getThisState'
    })
  },
  created() {
    Promise
      .all([
        this.$store.dispatch('fetchArticles'),
        this.$store.dispatch('fetchAuthors'),
        this.$store.dispatch('fetchInterests')
      ])
      .then(() => {
        this.isLoaded = true
      })
  },
  methods: {
    ...mapActions({
      openEditForm: 'openEditAuthorForm',
      closeEditForm: 'closeEditAuthorForm',
      openDeleteForm: 'openDeleteAuthorForm'
    }),
    setCurrentAuthor (author) {
      this.$store.commit(types.SET_EDIT_AUTHOR, author)
    }
  }
}
</script>

