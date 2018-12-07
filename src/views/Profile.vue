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
                @click="currentAuthor = author"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ author.name }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
        </v-flex>
        <v-flex xs12 md4>
          <div class="text-xs-center" v-if="currentAuthor != false">
            <v-avatar size="125px">
              <img
                class="img-circle elevation-7 mb-1"
                src="../assets/icon.jpg"
              >
            </v-avatar>
            <div class="headline">{{ currentAuthor.name }}</div>
            <div class="subheading text-xs-center grey--text pt-1 pb-3">({{ currentAuthor.age }}), {{ currentAuthor.sex }}</div>
            <v-layout justify-space-between>
              <a href="javascript:;" class="body-2">Home</a>
              <a href="javascript:;" class="body-2">About</a>
              <a href="javascript:;" class="body-2">Github</a>
              <a href="javascript:;" class="body-2">Other</a>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn fab dark color="indigo" absolute bottom right @click="dialog = true">
      <v-icon dark>add</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">New article</v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name" required
                              v-model="form.name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                  <v-slider
                    v-model="form.age"
                    :rules="rules.age"
                    color="orange"
                    label="Age"
                    hint="Be honest"
                    min="1"
                    max="100"
                    thumb-label
                  ></v-slider>
              </v-flex>
              <v-flex xs12>
                <v-select
                  v-model="form.sex"
                  :items="items"
                  label="Sex"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Отменить
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="saveAuthor"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      currentAuthor: [],
      dialog: false,
      items: ['male', 'female'],
      form: {
        name: '',
        age: '',
        sex: ''
      },
      rules: {
        age: [
          val => val > 10 || `I don't believe you!`
        ],
        name: [val => (val || '').length > 0 || 'This field is required']
      },
    }
  },
  computed: {
    ...mapGetters({
      articles: 'getAllArticles',
      authors: 'getAllAuthors'
    })
  },
  created() {
    this.$store.dispatch('fetchArticles');
    this.$store.dispatch('fetchAuthors')
  },
  methods: {
    saveAuthor() {
      this.$store.dispatch('createAuthor', this.form)
        .then(() => {
          this.dialog = false;
          this.form.name = '';
          this.form.age = '';
          this.form.sex = ''
        })
    }
  }
}
</script>

