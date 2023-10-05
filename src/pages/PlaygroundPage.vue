<template>
  <q-page padding>
    <q-card class="">
      <q-card-section class="">
        <div class="text-h6">Playground</div>
      </q-card-section>
      <q-card-section> </q-card-section>

      <q-separator />

      <q-card-actions vertical>
        <q-btn @click="cmdApiInvoke('/api/cmd/tare')">TARE</q-btn>
        <q-btn @click="cmdApiInvoke('/status/wifi-info')">getWifiInfo</q-btn>
      </q-card-actions>
    </q-card>

    <q-card>
      <q-card-section class="">
        <div class="text-h6">Store test</div>
      </q-card-section>
      <q-card-section class="">
        <div>forces</div>
        <span v-for="(force, idx) in this.store.graph.data" :key="idx"
          >{{ force }}N
        </span>

        <p>Settings</p>
        <p>{{ store.settings }}</p>

        <p>{{ store.counter }} {{ store.doubleCount }}</p>
      </q-card-section>
      <q-card-actions vertical>
        <q-btn @click="store.increment()">counter++</q-btn>
      </q-card-actions>
    </q-card>

    <div class="q-mt-md">
      <q-table
        title="Sensor Database"
        :rows="this.store.settings.sensors"
        :columns="columns"
        row-key="id"
        selection="single"
        v-model:selected="store.settings.sensorSelected"
      />
      <div class="q-mt-md">
        Selected: {{ JSON.stringify(store.settings.sensorSelected) }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMainStore } from "../stores/main-store.js";

export default {
  name: "App",
  methods: {
    cmdApiInvoke: function (url) {
      fetch(url)
        .then((res) => res.json())
        .then((out) => console.log("Checkout this JSON! ", out))
        .catch((err) => console.log("Checkout this error! ", err));
    },
  },
  setup() {
    const store = useMainStore();

    const columns = [
      {
        name: "id",
        align: "left",
        label: "#",
        field: "id",
        required: true,
        sortable: true,
      },
      {
        name: "desc",
        required: true,
        label: "Description",
        align: "left",
        field: "desc",
      },
      { name: "unit", label: "Unit", field: "unit" },
      { name: "serial", label: "Serial", field: "serial" },
      { name: "calibOffset", label: "Zero Offset", field: "calibOffset" },
      {
        name: "calibSensitivity",
        label: "Sensitivity",
        field: "calibSensitivity",
      },
    ];

    return {
      // you can return the whole store instance to use it in the template
      store,
      calibrationFactor: null,
      columns,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
  computed: {
    datasetsfull() {
      return {
        //labels: ["January", "February", "March"],
        //labels: this.store.graph.dataX,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            /*data: [
              {
                x: 0.328,
                y: 0.2,
              },
            ],*/
            data: this.store.graph.data,
          },
        ],
      };
    },
  },
  data() {
    return {
      //messages: [],
      //forces: [],
    };
  },
  components: {},
};
</script>
