<template>
  <q-page padding>
    <q-card class="">
      <q-card-actions>
        <CmdLink link="/api/cmd/tare" caption="Tare" />
      </q-card-actions>
      <q-separator />
      <q-card-section>
        <LineChart :chart-data="datasetsfull" />
        <div>
          Reading: <span id="reading">{{ this.store.reading }}</span> -
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CmdLink from "../components/CmdLink.vue";
import LineChart from "../components/LineChart.vue";
import { useMainStore } from "../stores/main-store.js";
import { useConfigurationStore } from "../stores/configuration-store.js";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const store = useMainStore();
    const configurationStore = useConfigurationStore();

    return {
      store,
      configurationStore,
    };
  },
  computed: {
    datasetsfull() {
      return {
        datasets: [
          {
            label:
              this.configurationStore.config.sensor.name +
              " [" +
              this.configurationStore.config.sensor.displayunit +
              "]",
            unit: "test",
            backgroundColor: "#f87979",
            data: this.store.graph.data,
          },
        ],
      };
    },
  },
  components: { CmdLink, LineChart },
});

var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function send(e, form) {
  fetch("/api/cmd", { method: "post", body: new FormData(form) });

  console.log("We send post asynchronously (AJAX)");
  e.preventDefault();
}
</script>
