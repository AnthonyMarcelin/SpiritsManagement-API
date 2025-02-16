import sequelize from "../database/client.js";
import Whisky from "./whisky.model.js";
import Rhum from "./rhum.model.js";
import Beer from "./beer.model.js";
import Label from "./label.model.js";
import Supplier from "./supplier.model.js";
import Type from "./type.model.js";




export { sequelize, Whisky, Beer, Rhum, Label, Type, Supplier};