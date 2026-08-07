import { selectUsers } from '@/entities/user/model/selectors'
import { RootState } from '@/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectSkills = (state: RootState) => state.skills.skills
export const selectSkillsLoading = (state: RootState) => state.skills.isLoading
export const selectSkillsError = (state: RootState) => state.skills.error
export const selectFilters = (state: RootState) => state.skills.filters

export const selectUserMap = createSelector([selectUsers], (users) =>
  Object.fromEntries(users.map((user) => [user.id, user])),
)

export const selectFilteredSkills = createSelector(
  [selectSkills, selectFilters, selectUserMap],
  (skills, filters, userMap) => {
    return skills.filter((skill) => {
      const user = userMap[skill.authorId]

      if (!user) return false

      if (filters.type && skill.type !== filters.type) return false
      if (filters.category?.length && !filters.category.includes(skill.category)) return false
      if (filters.subcategory?.length && !filters.subcategory.includes(skill.subcategory))
        return false
      if (filters.gender && user.gender !== filters.gender) return false
      if (filters.city?.length && !filters.city.includes(user.city)) return false

      return true
    })
  },
)
