'use client';

import type { FlowbiteAccordionTheme } from 'flowbite-react';
import { Accordion } from 'flowbite-react';

const customTheme: FlowbiteAccordionTheme = {
  root: {
    base: 'divide-y divide-gray-200 border-gray-200',
    flush: {
      off: 'rounded-lg border',
      on: 'border'
    }
  },
  content: {
    base: 'py-5 px-5 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg'
  },
  title: {
    arrow: {
      base: 'h-6 w-6 shrink-0',
      open: {
        off: '',
        on: 'rotate-180'
      }
    },
    base: 'flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium text-gray-600 dark:text-gray-400',
    flush: {
      off: 'hover:bg-gray-100',
      on: 'bg-transparent dark:bg-transparent'
    },
    heading: '',
    open: {
      off: '',
      on: 'text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white'
    }
  }
};

const QAs = [
  {
    question: 'What is Datadrops.io?',
    answer:
      'Datadrops.io is a data integration platform that allows you to access data from various sources you are connected with in programmatic way. Additionally it allows to transform the data, save and share it in a form of secured API.'
  },
  {
    question: 'How secure is my data in Datadrops?',
    answer:
      'User profile is stored separately and is not traceable to the data you are integrating. For subscribed users we provide data encryption, access control management, history logs and others tools to manage the data.'
  },
  {
    question: 'How long my data is kept?',
    answer:
      'For unsubscribed users unaccessed data is kept for 7 days until is soft-deleted. After 20 days it is hard-deleted. For subscribed users it is 30 and 60 days with ability to confgure.'
  }
];

export default function FaqQA() {
  return (
    <Accordion theme={customTheme}>
      {QAs.map((qa, indx) => (
        <Accordion.Panel key={indx}>
          <Accordion.Title className="bg-anti-glass">
            {qa.question}
          </Accordion.Title>
          <Accordion.Content className="bg-anti-glass">
            <p className="mb-2 text-gray-600 dark:text-gray-400">{qa.answer}</p>
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
}
