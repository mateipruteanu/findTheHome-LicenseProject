export enum ErrorMessages {
  UserNotFound = 'User not found',
  CannotDeleteAccount = 'User can not delete this account because it is not theirs',
  CannotUpdateAccount = 'User can not update this account because it is not theirs',
  CannotChangeUserRole = 'Cannot change users role because you do not have the correct permissions',
  RoleInvalid = 'Role is invalid',

  EmailAlreadyExists = 'Email already exists',
  InternalServerError = 'Internal Server Error',
  WrongPassword = 'Wrong password',
  PasswordsDontMatch = 'Passwords do not match',
  EmailNotFound = 'Email not found',
  BadRequest = 'Bad Request',
  Unauthorized = 'Unauthorized',

  AddressNotFound = 'Address not found',
  PostalCodeNotValid = 'Postal code not valid',

  ListingNotFound = 'Listing not found',
  UserCantEditListing = 'User can not edit this listing because it is not theirs',
  UserCantDeleteListing = 'User can not delete this listing because it is not theirs',

  PageNumberTooHigh = 'Page number exceeds the total number of pages',
  PageNumberTooLow = 'Page number is too low',
}
