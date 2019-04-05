
export interface IImmutableObject {
    get: (path: string, defaultValue?: any) => any;
    getIn: (path: string[]) => any;
    set: (path: string, value: any) => void;
    setIn: (path: string[], value: any) => void;
    toJS: () => any;
    toArray: () => any[];
    last: () => any;
    filter: (cb: Function) => any;
    findLast: (cb: Function) => any;
}

export interface IArgosStore {
    dashboard?: IImmutableObject;
    models: IImmutableObject;
    forms?: IImmutableObject;
    login?: IImmutableObject;
}

export interface IAction {
    type: string;
}

export interface IThunkAction {
    type: string;
    (dispatch: any, getState: () => IArgosStore, extraArgument: {}): {};
}

export interface ISelectOptions {
    label: string;
    value: string;
}

export interface IDailyForms {
    dailyFormsData: Object[];
    complete: number;
    inComplete: number;
    CompletedCount: string;
    InCompleteCount: string;
    InCompletePlantIds: string;
    CompletePlantIds: string;
}

export interface IQuarters {
    Quarter1: number;
    Quarter2: number;
    Quarter3: number;
    Quarter4: number;
    Complete: number;
    InComplete: number;
    InCompletePlantIds: number;
}

export interface IMonthlyForms {
    USTSpill: IMonthlyFormData;
    SW: IMonthlyFormData;
    USTRect: IMonthlyFormData;
    SpillLogs: IMonthlyFormData;
    SPCC: IMonthlyFormData;
}

export interface IQuarterlyForms {
    QTRVisual: IQuarters;
    ShopInspection: IQuarters;
}

export interface IHistory {
    push: (path: string) => void;
    location: {
        pathname: string;
    };
}

export interface IMonthlyFormData {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    Complete: number;
    InComplete: number;
}

export interface IFlaggedQuestions {
    Question?: number;
    QuestionNum?: number;
    Answer?: string;
}

export interface IQuestions {
    quesNum?: number;
    quesvalue?: string;
    answer?: string;
    question?: string;
    dateCompleted?: string;
    flaggedQuestion?: boolean;
    completedBy?: boolean;
    completed?: boolean;
    followUpComments?: boolean;

}

export interface IPlantDetails {
    PlantRegion: string;
    Plant_Region: string;
    PlantName: string;
    Plant_Name: string;
    Country: string;
    State: string;
    AddressCity: string;
    City: string;
    Street: string;
    PlantId: string;
    Zip: string;
    ZipCode: string;
    Shop: string;
}

export interface IFlaggedFormDetails {
    PlantId: string;
    UserId: string;
    Date: string;
    DatePlant: string;
    Type: string;
}

export interface IMonthlyFlaggedForms {
    // SW: IFlaggedFormDetails[];
    // SPCC: IFlaggedFormDetails[];
    // totalCount: number;
    monthlyForm: IFlaggedFormDetails[];
}

export interface IDailyFlaggedForms {
    dailyForm: IFlaggedFormDetails[];
}

export interface IFilters {
    region?: string;
    date?: string;
}

export interface IFiltersSimple {
    date?: string;
    region?: string;
}

export interface IIDs {
    PlantId: string;
    UserId: string;
    Date: string;
    UniqueId: string;
    Type: string;
    FormId: string;
    State: string;
    Region: string;
    Completed: number;
    CompletedBy: string;
    UserName: string;
    FollowUpComments: string;
}
