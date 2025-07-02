export interface Activity {
  [moment: string]: string[];
}

export interface Activities {
  [role: string]: Activity;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  role: string;
  moment: string;
}