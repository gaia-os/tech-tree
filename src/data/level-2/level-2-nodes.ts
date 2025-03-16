import { UiNode } from '@/lib/types';

export const ContributionsIncentivizedReflectsDecisionValueNode: UiNode = {
  id: 'contributions-incentivized-reflects-decision-value',
  data: {
    label:
      'Contributions are incentivized in a way that reflects the contributors decision value',
    description: '',
    nodeLabel: 'Target',
  },
  position: {
    x: -1899.8570649809928,
    y: -255.14139845375544,
  },
  width: 237,
  height: 133,
};

export const PlugPlaySystemTestingFeedbackingNode: UiNode = {
  id: 'plug-play-system-testing-feedbacking',
  data: {
    label:
      'Plug and Play System for Testing + Feedbacking on Models in Gaia or own environments',
    description: '',
    nodeLabel: 'Technology',
  },
  position: {
    x: -1899.255757693702,
    y: 259.116621158238,
  },
  width: 246,
  height: 164,
};

export const LEVEL_2_NODES: UiNode[] = [
  ContributionsIncentivizedReflectsDecisionValueNode,
  PlugPlaySystemTestingFeedbackingNode,
];
