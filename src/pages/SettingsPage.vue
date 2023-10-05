<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h4">System</div>
      </q-card-section>
      <q-card-section>
        System Settings
        <q-form action="/api/config/system" method="post" class="q-gutter-md">
          <q-input
            type="text"
            v-model="configurationStore.config.system.hostname"
            label="hostname"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.system.wifi_sta_ssid"
            label="wifi_sta_ssid"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.system.wifi_sta_password"
            label="wifi_sta_password"
          />
          <q-toggle
            v-model="configurationStore.config.system.wifi_ap_mode"
            label="ap mode"
          ></q-toggle>
          <q-input
            type="text"
            v-model="configurationStore.config.system.wifi_ap_ssid"
            label="wifi_sta_ssid"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.system.wifi_ap_password"
            label="wifi_sta_password"
          />
        </q-form>
      </q-card-section>
      <q-separator />
    </q-card>
    <q-card class="q-my-md">
      <q-card-section>
        <div class="text-h4">Sensor</div>
      </q-card-section>
      <q-card-section>
        Straing Gauge Settings.
        <q-form action="/api/config/sensor" method="post" class="q-gutter-md">
          <q-input
            type="text"
            v-model="configurationStore.config.loadcell.name"
            label="name"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.loadcell.serial"
            label="serial"
          />
          <q-input
            type="text"
            v-model="configurationStore.config.loadcell.displayunit"
            label="Displayunit"
          />
          <q-input
            type="number"
            v-model="configurationStore.config.loadcell.fullrange"
            label="Fullrange"
          />
          <q-input
            type="number"
            v-model="configurationStore.config.loadcell.sensitivity"
            label="Sensitivity"
          />
          <q-input
            type="number"
            v-model="configurationStore.config.loadcell.zerobalance"
            label="Zerobalance"
          />
        </q-form>
      </q-card-section>
      <q-separator />
    </q-card>
    <q-card class="q-my-md">
      <q-card-section>
        <div class="text-h4">Teach In</div>
      </q-card-section>
      <q-card-section>
        Calibrate the force sensor to a known reference. 1. Tare the sensor 2.
        Apply a defined force to the sensor 3. Recalc the new calibration value
        <q-form action="/api/cmd" method="post" class="q-gutter-md">
          <input hidden name="action" value="calibrateToKnownValue" />
          <q-input
            type="text"
            name="knownValue"
            v-model="knownValue"
            label="Known Weight"
          />
          <!-- <q-btn
            label="Calc new calibration value"
            type="submit"
            color="primary"
          /> -->
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <CmdLink link="/api/cmd/TODO" caption="Teach In Zerobalance" />
        <CmdLink link="/api/cmd/TODO" caption="Teach In Sensitivity" />
      </q-card-actions>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-gutter-xs">
        <CmdLink link="/api/cmd/loadconfiguration" caption="Load Config" />
        <CmdLink link="/api/cmd/saveconfiguration" caption="Persist Config" />
        <q-btn
          label="apply config"
          @click="configurationStore.updateServer()"
          color="primary"
        />
      </div>
    </q-page-sticky>

    <div>
      <p>Download configuration files from system memory:</p>
      <ul>
        <li><a href="/config/system.json" target="_blank">system.json</a></li>
        <li><a href="/config/sensor.json" target="_blank">sensor.json</a></li>
      </ul>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMainStore } from "../stores/main-store.js";
import { useConfigurationStore } from "../stores/configuration-store.js";
import CmdLink from "../components/CmdLink.vue";

export default defineComponent({
  name: "SettingsPage",
  components: { CmdLink },
  setup() {
    const store = useMainStore();
    const configurationStore = useConfigurationStore();
    const knownValue = ref(null);
    return {
      store,
      configurationStore,
      knownValue,
    };
  },
});
</script>
