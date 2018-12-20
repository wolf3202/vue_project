<template>
  <v-app light>
    <router-view></router-view>
    <v-footer class="secondary" app>
      <v-layout row wrap align-center>
        <v-flex xs12>
          <div class="white--text ml-3">
            <router-link to="/">Home     </router-link>
            <router-link to="/profile">Profile      </router-link>
            <router-link to="/Interest">Interest</router-link>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
