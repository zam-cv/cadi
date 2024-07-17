use once_cell::sync::Lazy;

pub static PHONE_REGEX: Lazy<regex::Regex> = Lazy::new(|| {
  regex::Regex::new(r"^(\+?[0-9]{1,3}[-\s]?)?(\(?[0-9]{1,4}\)?[-\s]?)*[0-9]{1,4}[-\s]?[0-9]{1,4}$").unwrap()
});