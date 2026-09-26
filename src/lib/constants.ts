export const BRAND = {
  cream: "#F7F3EE",
  ink: "#1C1917",
  borders: "#E7E0D6",
  terracotta: "#C4785A",
  terracottaHover: "#A86348",
  muted: "#78716C",
  surface: "#FFFFFF",
  soft: "#FDF0E8",
} as const;

export const PARENTS_REEL_CDN =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3JsXwMxPYRX5Y5gkWVT50VadBSB/hf_20260926_201157_ad9e1c3e-8730-4819-8c25-20ea822646a0.mp4";

export const PARENTS_REEL_LOCAL = "/reel-parents.mp4";

export type Variant = "hub" | "parents" | "couples" | "group";

export const USE_CASES = [
  { id: "message_to_child", label: "Message to my child" },
  { id: "message_to_partner", label: "Message to my partner" },
  { id: "family_legacy", label: "Family legacy" },
  { id: "future_milestone", label: "Future milestone" },
  { id: "after_im_gone", label: "Message to be discovered after I'm gone" },
  { id: "something_else", label: "Something else" },
] as const;

export const PRICING_OPTIONS = [
  { id: "free", label: "Free only" },
  { id: "2.99", label: "$2.99" },
  { id: "4.99", label: "$4.99" },
  { id: "9.99", label: "$9.99" },
  { id: "19.99+", label: "$19.99+" },
  { id: "not_sure", label: "Not sure" },
] as const;

export const DEFAULT_USE_CASE_BY_VARIANT: Record<
  Exclude<Variant, "hub">,
  string
> = {
  parents: "message_to_child",
  couples: "message_to_partner",
  group: "future_milestone",
};

export type FunnelEventName =
  | "page_view"
  | "hero_cta_click"
  | "video_play"
  | "waitlist_submit"
  | "use_case_selected"
  | "pricing_response";
