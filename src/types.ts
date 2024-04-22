export enum LibreLinkUpEndpoints {
  Login = "llu/auth/login",
  Country = "llu/config/country?country=DE",
  Connections = "llu/connections",
}

/**
 * @description A response from the Libre Link Up API.
 */
export interface LibreResponse {
  status: number,
  data?: Record<string, any>;
  error?: Record<string, any>;
}

/**
 * @description The successful login response from the Libre Link Up API.
 */
export interface LibreLoginResponse extends LibreResponse {
  data: {
    /**
     * @description The user object from the Libre Link Up API.
     */
    user: LibreUser;
    /**
     * @description The messages from the Libre Link Up API. Usually only the count of unread messages.
     */
    messages: LibreDataMessages;
    /**
     * @description The notifications from the Libre Link Up API. Usually only the count of unresolved notifications.
     */
    notifications: LibreNotifications;
    /**
     * @description The authentication ticket from the Libre Link Up API. The authentication token is stored here.
     */
    authTicket: LibreAuthTicket;
    
    invitations: string[] | null;
    trustedDeviceToken: string | "";
  };
};

/**
 * @description The redirect response from the Libre Link Up API. Usually happens when attempting to log in with the wrong region.
 */
export interface LibreRedirectResponse extends LibreResponse {
  data: {
    redirect: boolean;
    region: string;
  };
};

/**
 * @description An error response from the Libre Link Up API.
 */
export interface LibreErrorResponse extends LibreResponse {
  error: {
    message: string,
  };
};

/**
 * @description A user object from the Libre Link Up API.
 */
export interface LibreUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  /** Country of the user in alpha-2 format. eg. PL, DE, GB etc. */
  country: string;
  /** The language of the user interface in culture code format. eg. en-GB, de-DE, pl-PL etc. */
  uiLanguage: string;
  /** The language the system uses to communicate with the user (?) in culture code format. eg. en-GB, de-DE, pl-PL etc. */
  communicationLanguage: string;
  /** The account type of the user. For patient it's 'pat'. */
  accountType: string;
  created: Date;
  lastLogin: Date;
  uom: string;
  dateFormat: string;
  timeFormat: string;
  emailDay: number[];
  system: LibreSystem;
  details: Record<string, any>;
  programs: Record<string, any>;
  /** The practices that can access the user's data. */
  practices: Record<string, LibrePractice>;
  /** The devices that the user has connected to the account. */
  devices: Record<string, LibreDevice>;
  consents: LibreConsents;
}

interface LibreAuthTicket {
  token: string;
  expires: number;
  duration: number;
}

interface LibreDataMessages {
  unread: number;
}

interface LibreNotifications {
  unresolved: number;
}

interface LibreConsents {
  llu?: Llu;
  realWorldEvidence: RealWorldEvidence;
}

interface Llu {
  policyAccept: number;
  touAccept: number;
}

interface RealWorldEvidence {
  policyAccept: number;
  touAccept: number;
  history: { policyAccept: number, declined?: boolean }[];
}

interface LibreSystem {
  messages: LibreSystemMessages;
}

interface LibreSystemMessages {
  appReviewBanner: number;
  firstUsePhoenix: number;
  firstUsePhoenixReportsDataMerged: number;
  lluGettingStartedBanner: number;
  lluNewFeatureModal: number;
  lluOnboarding?: number;
  lvWebPostRelease: string;
  streamingTourMandatory: number;
}

/** The practice facility that can access the user's data. */
interface LibrePractice {
  id: string;
  practiceId: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  records: null;
}

interface LibreDevice {
  id: string;
  nickname: string;
  sn: string;
  type: number;
  uploadDate: number;
}