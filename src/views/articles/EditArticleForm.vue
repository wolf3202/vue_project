<template>
  <div>
    <v-dialog
      :value="visible"
      @input="close()"
      max-width="400"
      persistent
    >
      <v-card>
        <v-card-title class="headline">New article</v-card-title>

        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="editArticleForm" v-model="valid" lazy-validation autocomplete="off">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Title"
                                v-model="title"
                                :rules="rules.title"
                                required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="body"
                    :rules="rules.body"
                    color="teal"
                    required
                  >
                    <div slot="label">Content:</div>
                  </v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="authorId"
                    :rules="rules.authorId"
                    :items="authors"
                    item-text="name"
                    item-value="id"
                    label="Select author"
                    required
                  ></v-select>
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
import {mapState, mapGetters} from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'EditArticleForm',
  watch: {
    visible(value) {
      if (!!value && this.isNew) {
        this.$refs.editArticleForm.reset()
      }
    }
  },
  data() {
    return {
      valid: true,
      form: {
        title: '',
        body: '',
        authorId: ''
      },
      rules: {
        title: [
          v => !!v || 'Title is required'
        ],
        body: [
          v => !!v || 'Body is required'
        ],
        authorId: [
          v => !!v || 'Author is required'
        ]
      }
    }
  },
  computed: {
    ...mapState({
      visible: state => state.editArticle.editForm.visible,
      isNew: state => !state.editArticle.main.id,
      errorText: state => state.editArticle.errorText
    }),
    ...mapGetters({
      authors: 'getAllAuthors'
    }),
    title: {
      get() {
        return this.$store.state.editArticle.main.title
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_ARTICLE_TITLE, value)
      }
    },
    body: {
      get() {
        return this.$store.state.editArticle.main.body
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_ARTICLE_BODY, value)
      }
    },
    authorId: {
      get() {
        return this.$store.state.editArticle.main.authorId
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_ARTICLE_AUTHOR_ID, value)
      }
    }
  },
  created() {
    this.$store.dispatch('fetchAuthors')
  },
  methods: {
    save() {
      if (this.$refs.editArticleForm.validate()) {
        this.$store.dispatch('saveEditArticle')
      }
    },
    close() {
      this.$store.dispatch('closeDeleteArticleForm')
      this.$refs.editArticleForm.reset()
    }
  }
}
</script>
