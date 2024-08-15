import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import MultipleSearchAutocomplete from "@/components/MultipleSearchAutocomplete";
import { Listbox, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import React, { Fragment, useState } from "react";

const ProductEffectsForm = ({
  adverseEffects,
  setAdverseEffects,
  howDiseaseAffectDrug,
  setHowDiseaseAffectDrug,
  skippedDosage,
  setSkippedDosage,
  adverseEffectLinks,
  setAdverseEffectLinks,
}) => {
  const [advantage, setAdvantage] = useState("");

  const addAdvantageHandler = () => {
    const _symptoms = [...adverseEffects];

    if (advantage.trim() !== "") {
      setAdverseEffects([..._symptoms, advantage]);
      setAdvantage("");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Product Effects</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>
      <div className="w-full space-y-3">
        <div className="w-full ">
          <MultipleSearchAutocomplete
            title={"Adverse Effects"}
            item={adverseEffects}
            setItem={setAdverseEffects}
            links={adverseEffectLinks}
            setLinks={setAdverseEffectLinks}
            searchUrl={`${"master-data/adverse-effect"}`}
          />

          {adverseEffects?.length > 0 && (
            <div className="mt-1 mb-4 flex  items-center flex-wrap">
              {adverseEffects?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const _data = [...adverseEffects];
                    setAdverseEffects([
                      ..._data.filter((item2, index2) => index !== index2),
                    ]);
                    setAdverseEffectLinks([
                      ...adverseEffectLinks.filter(
                        (item3, index3) => index !== index3
                      ),
                    ]);
                  }}
                  className="px-2 p-1 mr-2 my-1 text-xs cursor-pointer group bg-green-100 rounded-md"
                >
                  <div className="flex space-x-3">
                    <div className="">{item}</div>
                    <TrashIcon className="h-4 w-4 text-red-500 hidden group-hover:block" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DefaultTextarea
          label={"How disease effects drugs"}
          value={howDiseaseAffectDrug}
          onChange={(e) => setHowDiseaseAffectDrug(e.target.value)}
        />
        <DefaultTextarea
          label={"Skipped Dosage"}
          value={skippedDosage}
          onChange={(e) => setSkippedDosage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ProductEffectsForm;
