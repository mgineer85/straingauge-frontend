<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title> Strain Gauge Box </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Measure" />
        <q-route-tab to="/Settings" label="Settings" />
        <!-- <q-route-tab to="/Playground" label="Playground" /> -->
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <q-toolbar>
        <q-chip icon="link"
          ><span id="ping">{{ this.store.ping }}</span></q-chip
        >
        <q-chip icon="battery_std"
          ><span id="battery">{{ this.store.battery }}</span
          >%</q-chip
        >

        <q-separator vertical />

        <span @click="logmessagesDisplay = true">{{
          this.store.messages[0]
        }}</span>
      </q-toolbar>
    </q-footer>

    <q-dialog v-model="logmessagesDisplay" position="bottom">
      <q-card style="" class="q-pa-md">
        <div class="text-h6">Log Messages</div>

        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left">Time</th>
              <th class="text-right">Message</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(message, idx) in this.store.messages" :key="idx">
              <td>-</td>
              <td>{{ message }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useMainStore } from "../stores/main-store.js";

export default defineComponent({
  name: "MainLayout",

  components: {},
  setup() {
    const store = useMainStore();

    return {
      // you can return the whole store instance to use it in the template
      store,
      logmessagesDisplay: ref(false),
    };
  },
});
</script>
