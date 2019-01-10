<template>
  <v-dialog
    :value="visible"
    @input="close()"
  >
    <v-card>
      <v-card-title class="headline">New author</v-card-title>
      <v-card-text>
        <v-form ref="editAuthorForm" v-model="valid" lazy-validation autocomplete="off">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-avatar
                  color="grey lighten-2"
                  size="150"
                  @click="pickFile"
                  style="margin: 0 auto 20px; display: block;"
                >
                  <img :src="avatarUrl" v-if="avatarUrl">
                  <v-icon dark size="78" v-else>account_circle</v-icon>
                </v-avatar>
                <input
                  type="file"
                  style="display: none"
                  ref="image"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Name" required
                              v-model="authorName"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-slider
                  v-model="age"
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
                  v-model="sex"
                  :items="items"
                  label="Sex"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="interestList"
                  :items="interests"
                  item-text="name"
                  item-value="id"
                  attach
                  chips
                  label="Interests:"
                  multiple
                ></v-select>
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
  name: 'EditAuthorForm',
  watch: {
    visible(value) {
      if (!!value && this.isNew) {
        this.$refs.editAuthorForm.reset()
      }
    }
  },
  data() {
    return {
      valid: true,
      items: ['male', 'female'],
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
      visible: state => state.editAuthor.editForm.visible,
      isNew: state => !state.editAuthor.main.id,
      errorText: state => state.editAuthor.errorText
    }),
    authorName: {
      get() {
        return this.$store.state.editAuthor.main.name
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_AUTHOR_NAME, value)
      },
    },
    age: {
      get() {
        return this.$store.state.editAuthor.main.age
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_AUTHOR_AGE, value)
      },
    },
    sex: {
      get() {
        return this.$store.state.editAuthor.main.sex
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_AUTHOR_SEX, value)
      },
    },
    interestList: {
      get() {
        return this.$store.state.editAuthor.main.interestIds
      },
      set(value) {
        this.$store.commit(types.UPDATE_EDIT_AUTHOR_INTERESTS, value)
      }
    },
    avatarUrl: {
      get () {
        return this.$store.state.editAuthor.avatar.url
      },
      set (value) {
        this.$store.commit(types.UPDATE_EDIT_AUTHOR_AVATAR_URL, value)
      }
    },
    ...mapGetters({
      articles: 'getAllArticles',
      authors: 'getAllAuthors',
      interests: 'getAllInterests',
    })
  },
  created() {

  },
  methods: {
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        const fileName = files[0].name
        if (fileName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.avatarUrl = fr.result
          this.$store.commit(types.UPDATE_EDIT_AUTHOR_AVATAR_NAME, fileName)
          this.$store.commit(types.UPDATE_EDIT_AUTHOR_AVATAR_FILE, files[0])
        })
      } else {
        this.avatarUrl = null
        this.$store.commit(types.UPDATE_EDIT_AUTHOR_AVATAR_NAME, null)
        this.$store.commit(types.UPDATE_EDIT_AUTHOR_AVATAR_FILE, null)
      }
    },
    save() {
      if (this.$refs.editAuthorForm.validate()) {
        this.$store.dispatch('saveEditAuthorWithAvatar')
      }
    },
    close() {
      this.$store.dispatch('closeEditAuthorForm')
      this.$refs.editAuthorForm.reset()
    }
  }
}
</script>
