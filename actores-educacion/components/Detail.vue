<template>
  <div class="organization">
    <h3 class="organization__name column">{{ organization.name }}</h3>
    <p><small>{{ organization.type }}</small></p>
    <p><small>Influencia {{ organization.influence_level.toLowerCase() }}</small></p>
    <p class="organization__description">{{ organization.description }}</p>
    <p><strong>Nombre de contacto: </strong>{{ organization.contact_name }}</p>
    <p><strong>Email: </strong>{{ organization.contact_email }}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    organization: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.organization {
  padding: 0 10px;
}

.organization__name {
  font-size: 24px;
}
</style>

