import { State } from "ionicons/dist/types/stencil-public-runtime";
import React, { useState, useEffect } from "react";
import { FamilyInfo } from "../models/FamilyInfo";

export function useFamilyData() {
    const [families, setFamilies] = useState<number>(0);
    const boopDaConsole = () => {
        setFamilies(families+1);
        console.log(`le boop ${families}`);
    };

    return {
        boopDaConsole,
        families,
     } as const;
}