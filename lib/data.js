import { SKILLS } from './skills';

export function getSkills() {
  return SKILLS.sort((a, b) => b.installs - a.installs);
}

export function getSkillBySlug(slug) {
  return SKILLS.find(s => s.slug === slug) || null;
}
