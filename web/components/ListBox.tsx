import { Fragment, useState } from 'react'
import PropTypes, {InferProps} from 'prop-types'
import Image from 'next/image'
import { Listbox, Transition } from '@headlessui/react'
import NlLogo from '../public/assets/teamLogos/NL.png'
import { HiChevronUpDown } from 'react-icons/hi2'
import {BsCheckLg} from 'react-icons/bs'

export default function ListBox({list, selected, setSelected} : InferProps<typeof ListBox.propTypes>) {

  return (
      <Listbox onChange={setSelected}>
        <div className="relative mt-1 text-[#EAD5E6]">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-[#101021] py-4 pl-3 pr-10 text-center shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-[100px] text=[#EAD5E6]">
            <div className="flex justify-between mr-40">
              <Image className ="rounded-full" src={selected.logo} alt='/../public/assets/teamLogos/pxe_logo.png' width={150} height={150}/>
              {selected.name}
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <HiChevronUpDown
                  className="h-20 w-20 text-[#ED009C] mt-12"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > 
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {list.map((item: any, itemIdx: any) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }: any) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <BsCheckLg className="h-5 w-5" aria-hidden="true" />
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

  )
}
ListBox.propTypes = {
  list: PropTypes.any,
  selected: PropTypes.any,
  setSelected: PropTypes.any
}
