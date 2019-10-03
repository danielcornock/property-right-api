const mongoose = require('mongoose');
const validator = require('validator');

const Property = require('../properties/propertyModel');

const tenantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'You must be logged in to add a tenant']
    },
    propertyId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property'
    },
    propertyName: String,
    name: String,
    email: String,
    phone: String,
    leadTenant: {
      type: Boolean,
      default: false
    },
    notes: [
      {
        title: String,
        body: String
      }
    ],
    avatar: {
      bgColor: String,
      textColor: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tenantSchema.pre('save', async function setPropertyName(next) {
  if (this.propertyId) {
    const { name } = await Property.findById(this.propertyId);
    this.propertyName = name;
  }

  next();
});

tenantSchema.pre('save', async function setAvatarDetails(next) {
  const hue = Math.floor(Math.random() * (360 - 0)) + 0;
  this.avatar.bgColor = `hsl(${hue}, 58%, 76%)`;
  this.avatar.textColor = `hsl(${hue}, 58%, 20%)`;
  next();
});

tenantSchema.virtual('avatar.initials').get(function getInitials() {
  const splitName = this.name.split(' ');
  return (splitName.length === 1
    ? splitName.join('')[0]
    : splitName.reduce((total, x, index) =>
        index === 1 ? total[0] + x[0] : total + x[0]
      )
  ).toUpperCase();
});

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
