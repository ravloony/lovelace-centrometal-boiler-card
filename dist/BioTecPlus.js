import {
    html,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

import { DisplaySubArea } from "./DisplaySubArea.js?v=0.0.22"
import { DisplayWithPowerButton } from "./DisplayWithPowerButton.js?v=0.0.22"

export class BioTecPlusDisplay extends DisplayWithPowerButton {

    constructor(card) {
        super(card, 0, 0, 1024, 562)
    }

    configureDisplay() {
        try {
            this.configureParameter("sensor.biotec", "boiler_state|b_state")
            this.configureParameter("sensor.biotec", "fire_sensor|b_fotb")
            this.configureParameter("sensor.biotec", "fan|b_fan")
            this.configureParameter("sensor.biotec", "air_flow_engine_primary|b_pris")
            this.configureParameter("sensor.biotec", "air_flow_engine_secondary|b_secs")
            this.configureParameter("sensor.biotec", "pellet_dispenzer|b_doz")
            this.configureParameter("sensor.biotec", "buffer_tank_temparature_up|b_tak1_1")
            this.configureParameter("sensor.biotec", "buffer_tank_temparature_down|b_tak2_1")
            this.configureParameter("sensor.biotec", "boiler_temperature_wood|b_tk1b")
            this.configureParameter("sensor.biotec", "boiler_temperature_pellet|b_tk1p")
            this.configureParameter("sensor.biotec", "firebox_temperature|b_tlo1")
            this.configureParameter("sensor.biotec", "glow|b_zar")
            this.configureParameter("sensor.biotec", "boiler_pump|b_p1")
            this.configureParameter("sensor.biotec", "boiler_pump_demand|b_zahp1")
            this.configureParameter("sensor.biotec", "flue_gas|b_tdpl1")
            this.configureParameter("sensor.biotec", "wood_pellet_mode|b_pbs")
            this.configureParameter("sensor.biotec", "control_mode|b_scs")
            this.configureParameter("sensor.biotec", "configuration|b_konf")
            this.configureParameter("sensor.biotec", "take_over|b_preuz")

            // optional
            this.configureParameter("sensor.biotec", "outdoor_temperature|b_tva1", "optional")
            this.configureParameter("sensor.biotec", "lambda_sensor|b_oxy1", "optional")
            this.configureParameter("sensor.biotec", "tank_level|b_razina", "optional")
            this.configureParameter("sensor.biotec", "operation_mode|b_zlj", "optional")
            this.configureParameter("sensor.biotec", "second_pump|b_p2", "optional")
            this.configureParameter("sensor.biotec", "second_pump_demand|b_zahp2", "optional")
            this.configureParameter("sensor.biotec", "domestic_hot_water|b_tptv1", "optional")

            // Service
            this.configureParameter("switch.biotec", "boiler_switch")

        } catch (error) {
            return error;
        }

        return this;
    }

    createContent(hass)
    {
        this.updateParameterValues(hass);

        if (this.values["boiler_state"] == "-") {
            return this.createCard("biopl/background.png",
                html`${this.createText("Boiler unavailable", 36, "color: #ffffff;", 390, 30)}`)
        }

        return this.createCard("biopl/background.png", html`

            <!-- Boiler top -->
            ${this.createImage("biopl/eub.png", 2, 1, 226, null, 7)}

            <!-- Fire -->
            ${this.conditional(
                this.values["fire_sensor"] >= 1000,
                this.createText(">1M", 22, "color: #000000;", 347, 374, null, null, 2, null, "fire_sensor"))}
            ${this.conditional(
                this.values["fire_sensor"] < 1000,
                html`${this.createText(this.values["fire_sensor"] + "k", 22, "color: #000000;", 347, 374, null, null, 2, null, "fire_sensor")}
                     ${this.createImage("peltec/vatra.gif", 302, 390, 40, null, 2, "fire_sensor")}`)}

            <!-- Fan -->
            ${this.conditional(
                this.values["fan"] == 0,
                this.createImage("unit/ventilatorStoji-unit.png", 65, 100, 100, null, 5, "fan")
            )}
            ${this.conditional(
                this.values["fan"] != 0,
                this.createImage("biotec/fan.gif", 65, 100, 100, null, 6, "fan")
            )}

            <!-- Air flow engine positions -->
            ${this.createText(this.values["air_flow_engine_primary"] + "%", 26, "color: #000000;", 100, 302, null, null, 4, null, "air_flow_engine_primary")}
            ${this.createText(this.values["air_flow_engine_secondary"] + "%", 26, "color: #000000;", 100, 365, null, null, 4, null, "air_flow_engine_secondary")}

            <!-- Fire Grid -->
            ${this.createImage("biopl/resetka.png", 282, 495, 80, null, 2, "")}

            <!-- Pellet dispenzer -->
            ${this.conditional(this.values["pellet_dispenzer"] == 0,
                this.createImage("unit/dozatorStoji.png", 308, 341, 28, null, 4, ""),
                this.createImage("unit/dozator_1.gif", 308, 341, 28, null, 4, ""))}

            <!-- Outdoor temperature -->
            ${this.createImage("cmpelet/vanjska.png", 890, 30, 20, "auto", "outdoor_temperature")}
            ${this.createText(this.formatTemperature("outdoor_temperature") + "°C", 24, "color: #ffffff; text-align: right;", 800, 45, 80, null, 3, null, "outdoor_temperature")}

            <!-- Boiler temperature  -->
            ${this.conditional(
                "boiler_temperature_wood" in this.values,
                this.createText(this.formatTemperature("boiler_temperature_wood") + " °C", 34, "color: #000000;",
                    35, 90, null, null, 7, null, "boiler_temperature_wood")
            )}
            ${this.conditional(
                "boiler_temperature_pellet" in this.values,
                this.createText(this.formatTemperature("boiler_temperature_pellet") + " °C", 34, "color: #000000;",
                    300, 90, null, null, 7, null, "boiler_temperature_pellet")
            )}

            <!-- Firefox temperature -->
            ${this.createText(this.formatTemperature("firebox_temperature", "--", 1000) + "°C", 30, "color: #000000;", 65, 510, null, null, 4, null, "firebox_temperature")}

            <!-- Glow -->
            ${this.conditional(
                this.values["glow"] == 1,
                this.createImage("biotec/glow.png", 65, 435, 100, null, 3, "glow")
            )}

            <!- Pump -->
            ${this.conditional(
                this.values["boiler_pump_demand"] == 1,
                this.createImage("peltec/demand_p.png", 443, 492, 12, null, 3, "boiler_pump_demand"),
                this.createImage("transparent.png", 443, 492, 12, null, 3, "boiler_pump_demand"))}
            ${this.conditional(
                this.values["boiler_pump"] == 1,
                this.createImage("peltec/pumpaokrece.gif", 442, 465, 64, null, 2, "boiler_pump"),
                this.createImage("transparent.png", 442, 465, 64, null, 2, "boiler_pump"))}

            <!-- Flue gas temperature -->
            ${this.createText(this.formatTemperature("flue_gas", "--", 1000) + "°C", 28, "color: #FFFFFF;",  5, 15, null, null, 8, null, "flue_gas")}
            ${this.createImage("peltec/senzor_b_1.png", 120, 34, 40, null, 8)}

            <!-- Oxygen (lambda) sensor -->
            ${this.conditional(
                "lambda_sensor" in this.values && this.values["lambda_sensor"] > 0.1,
                html`${this.createImage("peltec/senzor_b_2.png", 75, 35, 40, null, 8)}
                     ${this.createText(html`
                        ${this.values["lambda_sensor"] < 25.4 ? this.values["lambda_sensor"] : "-.-"}%`, 28,
                         "color: #ffffff; text-align: center;", 175, 30, null, null, 8, null, "lambda_sensor")}`)}

            <!-- Pellet tank level -->
            ${this.conditional(
                'tank_level' in this.values,
                html`${this.conditional(this.values["tank_level"] == "Full",
                        this.createImage("biopl/fuel_2.png", 380, 138, 13, "auto", 2, "tank_level"))}
                    ${this.conditional(this.values["tank_level"] == "Reserve",
                        this.createImage("biopl/fuel_1.png", 380, 138, 13, "auto", 2, "tank_level"))}
                    ${this.conditional(this.values["tank_level"] == "Empty",
                        this.createImage("biopl/fuel_0.png", 380, 138, 13, "auto", 2, "tank_level"))}`)}

            <!-- Tap/radiator mode -->
            ${this.conditional(
                "operation_mode" in this.values && (this.values["operation_mode"] == 1),
                this.createImage("cmpelet/slavina.png", 930, 10, 80, "auto", 2)
            )}
            ${this.conditional(
                "operation_mode" in this.values && (this.values["operation_mode"] == 0 || this.values["operation_mode"] == 2),
                this.createImage("cmpelet/radijator.png", 930, 10, 80, "auto", 2)
            )}

            <!-- Boiler State -->
            ${this.createText(this.values["boiler_state"], 32, "text-align:center;color: #ffffff;", 900, 350, 120, null, 4, null, "boiler_state")}

            <!-- Boiiler state icon -->
            ${this.conditional(this.values["boiler_state"] != "OFF",
                this.createImage("peltec/playradi.gif", 942, 390, 40, null, 4, "boiler_state"),
                this.createText("", 32,
                    "display:block;background-repeat: no-repeat; background-image: url('/img/start_stop.png'); background-position: 0px 0px;",
                    945, 390, 36, 36, 4, null, "boiler_state"))}

            <!-- Buffers -->
            ${this.showMainBuffer()}
            ${this.showDHWBuffer()}

            <!-- Wood or pellet selection -->
            ${this.showWoodAndPelletSelection()}

            <!-- Show boiler not available if necessary -->
            ${this.showBoilerNotAvailable()}

            <!-- Show boiler not available if necessary -->
            ${this.showTakeOver()}

            <!-- Boiler power button -->
            ${this.createPowerButton(function (root) { this.turnBioTecPlusPelletOn(root); }, function (root) { this.turnBioTecPlusPelletOff(root); })}

            <!-- disable on/off button if necessary -->
            ${this.hideOnOffButtonWhenInWoodMode()}
        `);
    }

    turnBioTecPlusPelletOn(root) {
        root.hass.callService("switch", "turn_on", {entity_id: root.display.parameters["boiler_switch"]});
    }

    turnBioTecPlusPelletOff(root) {
        root.hass.callService("switch", "turn_off", {entity_id: root.display.parameters["boiler_switch"]});
    }

    hideOnOffButtonWhenInWoodMode() {
        this.buttonArea = new DisplaySubArea(this, 904, 439, 114, 114);
        return html`
            ${this.conditional(this.values["wood_pellet_mode"] == 0,
                this.buttonArea.createSubArea(4, "border: none; border-radius: 50%; background-color: #258095; opacity: 0.9;", html``)
        )}`
    }

    showWoodAndPelletSelection() {
        this.woodBoilerShadow = new DisplaySubArea(this, 1, 120, 220, 439)
        this.pelletBoilerShadow = new DisplaySubArea(this, 221, 120, 192, 439)
        return html`
            ${this.conditional(this.values["wood_pellet_mode"] == 1,
                this.woodBoilerShadow.createSubArea(4, "border: none; background-color: #258095; opacity: 0.9;", html``),
                this.pelletBoilerShadow.createSubArea(4, "border: none; background-color: #258095; opacity: 0.9;", html``)
            )}`
    }

    showMainBuffer() {
        this.mainBufferArea = new DisplaySubArea(this, 580, 180, 200, 300)
        return this.conditional(
            this.hexBitIsClear(this.values["configuration"], 11),
            this.mainBufferArea.createSubArea(1, "", html`
                ${this.mainBufferArea.createImage("biopl/akuSpremnik.png", 0, 0, 174, null, 2, "")}
                ${this.mainBufferArea.createText(
                    this.formatTemperature("buffer_tank_temparature_up") + " °C", 32, "color: #0000ff; text-align: center;",
                    55, 65, null, null, 2, null, "buffer_tank_temparature_up")}
                ${this.mainBufferArea.createText(
                    this.formatTemperature("buffer_tank_temparature_down") + " °C", 32, "color: #0000ff; text-align: center;",
                    55, 283, null, null, 2, null, "buffer_tank_temparature_down")}
            `))
    }

    showDHWBuffer() {
        this.dhwBufferArea = new DisplaySubArea(this, 755, 180, 150, 360)
        return this.conditional(
            this.hexBitIsSet(this.values["configuration"], 5),
            this.dhwBufferArea.createSubArea(1, "", html`
                ${this.dhwBufferArea.createImage("biopl/dhw.png", 3, 98, 138, null, 3, "")}
                ${this.dhwBufferArea.createText(
                    this.formatTemperature("domestic_hot_water") + " °C", 32, "color: #0000ff; text-align: center;",
                    48, 133, null, null, 4, null, "domestic_hot_water")}
                    <!- Pump -->
                    ${this.conditional(
                        this.values["second_pump_demand"] == 1,
                        this.dhwBufferArea.createImage("peltec/demand_p.png", 5, 199, 12, null, 6, "second_pump_demand"),
                        this.dhwBufferArea.createImage("transparent.png", 5, 199, 12, null, 6, "second_pump_demand"))}
                    ${this.conditional(
                        this.values["second_pump"] == 1,
                        this.dhwBufferArea.createImage("peltec/pumpaokrece.gif", 4, 172, 64, null, 5, "second_pump"),
                        this.dhwBufferArea.createImage("transparent.png", 4, 172, 64, null, 5, "second_pump"))}
            `))
    }

    showBoilerNotAvailable() {
        this.boilerNotAvailable = new DisplaySubArea(this, 400, 10, 400, 60);
        return this.conditional(this.values["control_mode"] == 2,
                this.boilerNotAvailable.createSubArea(5, "border: solid 1px; border-color: black; border-radius: 10px 10px 10px 10px; background-color: red; opacity: 0.9;",
                    html`
                    ${this.boilerNotAvailable.createText(
                        "Temporarily disabled access to the boiler!",
                        18, "font-weight: bold; color: #ffffff; text-align: left;",
                        20, 20, null, null, 6, null)}
                `))
    }

    showTakeOver() {
        this.takeOver = new DisplaySubArea(this, 900, 160, 120, 170);
        return html`
            ${this.createText(html`<b><u>TAKING OVER:</u></b>`, 16, "font-weight: bold; color: #bddede; text-align: left;",
                905, 150, null, null, 6, null)}
            ${this.conditional(
                this.values["wood_pellet_mode"] == 0 && this.values["control_mode"] == 1,
                this.takeOver.createSubArea(1, "", html`
                    ${this.conditional(this.values["take_over"] != 0,
                        this.takeOver.createImage("biopl/taking_off.png", 10, 20, 100, null, 4))}
                    ${this.conditional(this.values["take_over"] != 1,
                        this.takeOver.createImage("biopl/taking_pellet_on.png", 10, 70, 100, null, 4))}
                    ${this.conditional(this.values["take_over"] != 2,
                        this.takeOver.createImage("biopl/taking_pellet_off.png", 10, 120, 100, null, 4))}
                    ${this.conditional(this.values["take_over"] == 0,
                        this.takeOver.createImage("biopl/taking_off_active.png", 10, 20, 100, null, 4))}
                    ${this.conditional(this.values["take_over"] == 1,
                        this.takeOver.createImage("biopl/taking_pellet_on_active.png", 10, 70, 100, null, 4))}
                    ${this.conditional(this.values["take_over"] == 2,
                        this.takeOver.createImage("biopl/taking_pellet_off_active.png", 10, 120, 100, null, 4))}
                `)
            )}
            ${this.conditional(
                this.values["wood_pellet_mode"] == 1 || this.values["control_mode"] != 1,
                this.takeOver.createSubArea(2, "", html`
                    ${this.takeOver.createImage("biopl/taking_off_forbiden.png", 10, 20, 100, null, 4)}
                    ${this.takeOver.createImage("biopl/taking_pellet_on_forbiden.png", 10, 70, 100, null, 4)}
                    ${this.takeOver.createImage("biopl/taking_pellet_off_forbiden.png", 10, 120, 100, null, 4)}
                `)
            )}
            ${this.conditional(this.values["take_over"] > 0,
                this.takeOver.createImage("biopl/arrow_green.png", 208, 88, 30, "auto", 12))}
            `
    }

}
