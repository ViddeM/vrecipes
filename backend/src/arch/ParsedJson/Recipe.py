class RecipeJson:
    def __init__(self):
        self.name = ""
        self.description = ""
        self.cooking_time = -1
        self.oven_temp = -1
        self.ingredients = []
        self.steps = []


class RecipeIngredientJson:
    def __init__(self):
        self.name = ""
        self.amount = -1
        self.unit = ""


class RecipeStepJson:
    def __init__(self):
        self.step = ""
        self.number = -1
