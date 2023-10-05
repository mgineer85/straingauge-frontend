import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main-store", {
  state: () => ({
    counter: 0,

    //to be in sync with device (stored to eeprom)
    settings: {
      // TODO: remove.
      sensorSelected: ref([]),
      sensors: [
        {
          id: 0,
          desc: "test",
          unit: "N",
          serial: "1234",
          calibOffset: 0.1,
          calibSensitivity: 329,
        },
        {
          id: 2,
          desc: "test1",
          unit: "N",
          serial: "12341243",
          calibOffset: 0.1,
          calibSensitivity: 329,
        },
      ],
    },

    //local settings stored in browser
    localSettings: {},

    //session data only (graph history, ...)
    currentTick: 0,
    graph: {
      data: [],
    },

    messages: [],

    reading: null,
    force: null,
    battery: null,
    ping: null,
  }),
  getters: {
    //doubleCount: (state) => state.counter * 2,
  },
  actions: {
    /*increment() {
      this.counter++;
    },*/
  },
});
