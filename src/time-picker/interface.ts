import Vue from 'vue';
import { Instance } from '@popperjs/core';
import dayjs from 'dayjs';
import { TdTimePickerProps, TdTimeRangePickerProps } from './type';

import { EPickerCols } from './constant';

export type TimePickerProps  = TdTimePickerProps;
export type TimeRangePickerProps  = TdTimeRangePickerProps;

export * from './type';

// 输入类型
export type TimeInputType = 'hour' | 'minute' | 'second' | 'meridiem';
export interface InputTime {
  hour: number | string;
  minute?: number | string;
  second?: number | string;
  meridiem: 'AM' | 'PM' | string;
}

interface TimePickerSetInputValue {
  (val: dayjs.Dayjs | undefined): InputTime | undefined;
}

interface TimePickerDayjs2InputTime {
  (val: dayjs.Dayjs): InputTime;
}

export interface TimePickerInstance extends Vue {
  setInputValue: TimePickerSetInputValue;
  dayjs2InputTime: TimePickerDayjs2InputTime;
  formatString: string;
  formatedValue: string;
}

export interface PickerData {
  hour: number | string;
  minute?: number | string;
  second?: number | string;
  meridiem?: 'AM' | 'PM';
}

export interface InputEvent extends Event {
  data?: string;
  target: HTMLInputElement;
}

interface TimeInputOnInput {
  (e: Event, type: TimeInputType): void;
}

interface TimeInputOnBlur {
  (e: Event, type: TimeInputType): void;
}

export interface TimeInputInstance extends Vue {
  allowInput: boolean;
  onInput: TimeInputOnInput;
  onBlur: TimeInputOnBlur;
  setInputValue: Function;
  time: Record<string, any>;
}

// 输入变动数据
export interface TimeInputEvent {
  type: TimeInputType;
  value: number | string;
  index?: number;
}

export interface TimePickerPanelInstance extends Vue {
  renderFooter: () => HTMLElement;
  renderBody: () => HTMLElement;
  // 点击确认按钮 isFooterDisplay为true 只使用body部分可以不传
  confirmBtnClick?: () => void;
  // 点击此刻按钮 isFooterDisplay为true 只使用body部分可以不传
  nowAction?: () => void;
  renderSinglePicker: (index: number) => HTMLElement;
  handleTimePick: (col: EPickerCols, time: string | number, index: number) => void;
  scrollToTime: (colIndex: number, col: EPickerCols, time: number | string, behavior: ScrollBehavior) => void;
  panelColUpdate: () => void;
  classNames: Array<string>;
  colValues: Array<dayjs.Dayjs>;
  cols: Array<EPickerCols>;
  formatField: Record<string, string>;
  sectionComponentName: string;
  rangePicker: boolean;
  panel: Instance;
  isFooterDisplay: boolean;
  localeMeridiems: Array<string>;
}

export interface TimePickerPanelColInstance extends Vue {
  renderScrollers: () => Array<HTMLElement>;
  renderScroller: (col: EPickerCols) => HTMLElement;
  renderActiveMask: () =>  HTMLElement;
  scrollToTime: (col: EPickerCols, time: number | string, behavior?: ScrollBehavior) => void;
  getTimeItemHeight: (col: EPickerCols) => number; // 获取每个time item的高度
  generateColTime: (col: EPickerCols) => Array<number | string>;
  generateTimeList: (num: number, step: number) => Array<number>;
  generateColRows: (col: EPickerCols) => Array<HTMLElement>;
  calcScrollYDistance: (index: number) => number;
  calculateTimeIdx(time: number | string, step: number | string, type: EPickerCols): number;
  splitValue: Record<EPickerCols, number | string>;
  timeItemCanUsed: (col: EPickerCols, time: string | number) => boolean;
  handleTimeItemClick: (e: MouseEvent, col: EPickerCols, time: number | string) => void;
  handleScroll: (col: EPickerCols) => void;
  isCurrent: (col: EPickerCols, colItem: string | number) => boolean;
  updateTimeScrollPos: () => void;
  closestLookup: (availableArr: Array<any>, x: number, step: number) => number;
  disableFilter: (preIdx: number, col: EPickerCols) => any;
  valStr: string;
  isPm: boolean;
  currentTimes: [number, number, number];
  timeArr: [string, string, string];
}