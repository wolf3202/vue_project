<template>
  <v-content>
    <v-container>
      <v-layout row wrap align-center>
        <v-flex xs12 md4 align-self-baseline>
          <div class="text-xs-center">
            <v-avatar size="125px">
              <img
                class="img-circle elevation-7 mb-1"
                src="../assets/icon.jpg"
              >
            </v-avatar>
            <div class="headline">John <span style="font-weight:bold">Carter</span></div>
            <div class="subheading text-xs-center grey--text pt-1 pb-3">Lorem ipsum dolor sit amet</div>
            <v-layout justify-space-between>
              <a href="javascript:;" class="body-2">Home</a>
              <a href="javascript:;" class="body-2">About</a>
              <a href="javascript:;" class="body-2">Github</a>
              <a href="javascript:;" class="body-2">Other</a>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs12 md5 offset-md2>
          <div v-for="article in articles" :key="article.title">
            <v-card class="my-3" hover>
              <v-card-media
                class="white--text"
                height="170px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN_Ie2Dc5TTZboSkqwNGKMGEghWELTCn3bke2xiaVjuzeJAH0c"
              >
                <v-container fill-height fluid>
                  <v-layout>
                    <v-flex xs12 align-end d-flex>
                      <span class="headline">{{ article.title }}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-text>
                {{ article.body }}
              </v-card-text>
              <v-card-actions>
                <div v-for="author in authors" :key="author.name">
                  <div v-if="author.id == article.authorId">
                    <v-btn flat class="blue--text">{{ author.name }}</v-btn>
                  </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon ripple @click="openEditForm(article.id)">
                  <v-icon color="grey lighten-1">edit</v-icon>
                </v-btn>
                <v-btn icon ripple @click="openDeleteForm(article.id)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn fab dark color="pink" absolute bottom right @click="openEditForm()">
      <v-icon dark>add</v-icon>
    </v-btn>
    <editArticleForm/>
    <delete-article-form/>
  </v-content>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import editArticleForm from '@/views/articles/EditArticleForm'
import deleteArticleForm from '@/views/articles/DeleteArticleForm'

export default {
  name: 'Articles',
  components: {
    editArticleForm: editArticleForm,
    deleteArticleForm: deleteArticleForm
  },
  computed: {
    ...mapGetters({
      articles: 'getAllArticles',
      authors: 'getAllAuthors'
    })
  },
  created() {
    this.$store.dispatch('fetchArticles')
    this.$store.dispatch('fetchAuthors')
  },
  methods: {
    ...mapActions({
      openEditForm: 'openEditArticleForm',
      closeEditForm: 'closeEditArticleForm',
      openDeleteForm: 'openDeleteArticleForm'
    })
  }
}
</script>
