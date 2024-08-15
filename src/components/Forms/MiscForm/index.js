import DefaultInput from "@/components/Inputs/DefaultInput";
import DefaultTextarea from "@/components/Inputs/DefaultTextarea";
import { Listbox, Transition } from "@headlessui/react";
import { LinkIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const option = [
  {
    _id: 1,
    name: "Male",
    value: 1,
  },
  {
    _id: 2,
    name: "Female",
    value: 2,
  },
  {
    _id: 3,
    name: "Both (Male & Female)",
    value: 3,
  },
];

const MiscForm = ({
  gender,
  setGender,
  references,
  setReferences,
  faqs,
  setFaqs,
  referenceLinks = [],
  setReferenceLinks,
  name,
}) => {
  const router = useRouter();
  const [drug, setDrug] = useState("");
  const [drugs, setDrugs] = useState([]);
  const [faq, setFaq] = useState("");
  const [answer, setAnswer] = useState("");

  const [reference, setReference] = useState("");
  const [link, setLink] = useState("");

  const addRferences = () => {
    console.log("hdfshadg");
    const _references = [...references];
    const _referenceLinks = [...referenceLinks];
    if (reference.trim() !== "") {
      setReferences([..._references, reference]);
      if (link?.trim() !== "") {
        setReferenceLinks([..._referenceLinks, link]);
      } else {
        setReferenceLinks([..._referenceLinks, ""]);
      }
      setReference("");
      setLink("");
    }
  };

  const addFaq = () => {
    const _faqs = [...faqs];

    if (faq?.trim() !== "" && answer?.trim() !== "") {
      setFaqs([..._faqs, { question: faq, answer: answer }]);
      setFaq("");
      setAnswer("");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-2">
      <div className="text-xl text-gray-800 font-bold">Miscellaneous</div>
      <div className="my-3 h-px w-full bg-gray-300"></div>

      <div className="mt-3 space-y-3">
        <div className="flex items-center justify-between">
          <label
            for="first_name"
            class="block mb-1 text-sm font-semibold text-gray-600 "
          >
            References
          </label>
          <div
            onClick={() => addRferences()}
            className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
          >
            Click here to Add
          </div>
        </div>
        <div className="border p-2 rounded-md">
          <DefaultInput
            label="Reference Description"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          <DefaultInput
            label="Reference URL"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap ">
          {references?.map((item, index) => (
            <div
              className="text-xs p-2 rounded-md bg-green-100 mr-2 mt-2 cursor-pointer hover:shadow group"
              key={index}
            >
              <div className="flex space-x-3">
                <div>
                  <div className="whitespace-break-spaces">{item}</div>
                  <div className="flex">
                    <div>Link - </div>
                    {referenceLinks?.length > 0 && referenceLinks[index] ? (
                      <a
                        href={referenceLinks[index]}
                        target="_blank"
                        className="text-blue-500"
                      >
                        <LinkIcon className="w-4 text-blue-500" />
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
                <div className="flex w-12 space-x-2">
                  <PencilIcon
                    onClick={() => {
                      if (reference.trim() === "" && link.trim() === "") {
                        setReference(item);
                        setLink(referenceLinks[index]);
                        const _data = [...references];
                        setReferences([
                          ..._data.filter((item2, index2) => index !== index2),
                        ]);
                        setReferenceLinks([
                          ...referenceLinks.filter(
                            (item3, index3) => index !== index3
                          ),
                        ]);
                      } else {
                        toast.error(
                          "Please add the previously entered data to continue"
                        );
                      }
                    }}
                    className="h-4 w-4 text-blue hidden group-hover:block"
                  />
                  <TrashIcon
                    onClick={() => {
                      const _data = [...references];
                      setReferences([
                        ..._data.filter((item2, index2) => index !== index2),
                      ]);
                      setReferenceLinks([
                        ...referenceLinks.filter(
                          (item3, index3) => index !== index3
                        ),
                      ]);
                    }}
                    className="h-4 text-red-500 hidden group-hover:block"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label
          for="first_name"
          class="block mb-1 text-sm font-normal text-gray-600 "
        >
          Gender
        </label>
        <Listbox value={gender} onChange={(e) => setGender(e)}>
          <div className="relative mt-1">
            <Listbox.Button className="border px-3 py-2 w-full bg-white border-gray-300 text-gray-900 text-sm rounded-md text-left ">
              <span className="block truncate">
                {gender === 1
                  ? "Male"
                  : gender === 2
                  ? "Female"
                  : "Both (Male & Female)"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute top-0 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {option?.map((role, roleIdx) => (
                  <Listbox.Option
                    key={roleIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={role.value}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {role.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between">
            <label
              for="first_name"
              class="block mb-1 text-sm font-semibold text-gray-600 "
            >
              Faqs
            </label>
            <div
              onClick={() => addFaq()}
              className="cursor-pointer text-blue-700 underline text-sm underline-offset-1"
            >
              Click here to Add
            </div>
          </div>
          <div className="border p-2 rounded-xl space-y-3">
            <DefaultInput
              label="Question"
              value={faq}
              onChange={(e) => setFaq(e.target.value)}
            />
            <DefaultTextarea
              label="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div className="px-1 space-y-2 mt-3">
            {faqs?.map((item, index) => (
              <div
                className="flex bg-green-100 p-2 rounded-md cursor-pointer group"
                key={index}
              >
                <div>
                  <div>Q - {item.question}</div>

                  <div className="text-gray-600">
                    <span className="text-semibold">Ans -</span> {item.answer}
                  </div>
                </div>
                <div className="flex w-12 space-x-2">
                  <PencilIcon
                    onClick={() => {
                      if (faq?.trim() === "" && answer?.trim() === "") {
                        setFaq(item.question);
                        setAnswer(item?.answer);
                        const _data = [...faqs];
                        setFaqs([
                          ..._data.filter((item2, index2) => index !== index2),
                        ]);
                      } else {
                        toast.error(
                          "Please add the previously entered data to continue"
                        );
                      }
                    }}
                    className="h-4 w-4 text-blue hidden group-hover:block"
                  />
                  <TrashIcon
                    onClick={() => {
                      const _data = [...faqs];
                      setFaqs([
                        ..._data.filter((item2, index2) => index !== index2),
                      ]);
                    }}
                    className="h-4 w-4 text-red-500 hidden group-hover:block"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiscForm;
