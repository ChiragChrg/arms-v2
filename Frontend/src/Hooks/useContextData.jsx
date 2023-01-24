import { useContext } from "react";
import { Context } from "../Utils/Context";

export const useContextData = () => {
    return useContext(Context);
}