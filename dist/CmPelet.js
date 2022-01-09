import {
    html,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

import { DisplayWithPowerButton } from "./DisplayWithPowerButton.js"

export class CmPeletDisplay extends DisplayWithPowerButton {

    configureDisplay(hass) {
        try {
            this.configureParameter(hass, "sensor.cm_pelet", "boiler_state")
            this.configureParameter(hass, "sensor.cm_pelet", "command_active")
            this.configureParameter(hass, "sensor.cm_pelet", "firmware_version")
            this.configureParameter(hass, "sensor.cm_pelet", "b_smd")
            this.configureParameter(hass, "sensor.cm_pelet", "b_cp")
/*
            this.configureParameter(hass, "sensor.cm_pelet", "fan")
            this.configureParameter(hass, "sensor.cm_pelet", "boiler_pump")
            this.configureParameter(hass, "sensor.cm_pelet", "boiler_pump_demand")
            this.configureParameter(hass, "sensor.cm_pelet", "electric_heater")
            this.configureParameter(hass, "sensor.cm_pelet", "boiler_temperature")
            this.configureParameter(hass, "sensor.cm_pelet", "flue_gas")
            this.configureParameter(hass, "sensor.cm_pelet", "mixer_temperature")
            this.configureParameter(hass, "sensor.cm_pelet", "mixing_valve")
            // optional
            this.configureParameter(hass, "sensor.cm_pelet", "lambda_sensor", "optional")
            this.configureParameter(hass, "sensor.cm_pelet", "outdoor_temperature", "optional")
            this.configureParameter(hass, "sensor.cm_pelet", "tank_level", "optional")
            this.configureParameter(hass, "sensor.cm_pelet", "buffer_tank_temparature_up", "optional")
            this.configureParameter(hass, "sensor.cm_pelet", "buffer_tank_temparature_down", "optional")
            // Service
            this.configureParameter(hass, "switch.cm_pelet", "boiler_switch")
*/
        } catch (error) {
            return error;
        }
        return this;
    }

    createContent(hass)
    {
        this.updateParameterValues(hass);

        return this.createCard("cmpelet/peletsetdisplay-clean.png", html`

            <!-- boiler image on background -->
            ${this.conditional(
                this.values["firmware_version"] > 'v1.25' && this.values["b_cp"] == 1,
                this.createImage("cmpelet/boiler_centroplus.png", -1, 9, 347, null, 0)
        )}

        `);
    }

}
