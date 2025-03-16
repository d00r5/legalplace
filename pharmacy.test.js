import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Drug", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 1, 2)]);
    });

    it("should clamp benefit value", () => {
      expect(new Drug("test", 2, 500).benefit).toEqual(50);
      expect(new Drug("test", 2, -500).benefit).toEqual(0);
    });

    it("should decrease the benefit twice as fast when the expiresIn is over", () => {
      expect(
        new Pharmacy([new Drug("test", 0, 5)]).updateBenefitValue(),
      ).toEqual([new Drug("test", -1, 3)]);
    });

    it("should always have a benefit >= 0", () => {
      expect(
        new Pharmacy([new Drug("test", 1, 0)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 0, 0)]);
    });

    it("should always have a benefit <= 50", () => {
      expect(
        new Pharmacy([new Drug("test", 1, 150)]).updateBenefitValue(),
      ).toEqual([new Drug("test", 0, 49)]);
    });
  });

  describe("Magic Pill", () => {
    it("should not decrease the benefit nor expiresIn in Magic Pills", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 42, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 42, 9)]);
    });
  });

  describe("Herbal Tea", () => {
    it("should increase the benefit", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 42, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 41, 10)]);
    });

    it("should increase the benefit twice as fast when the expiresIn is over", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 11)]);
    });

    it("should always have a benefit <= 50", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 1, 49)]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Herbal Tea", 0, 50),
      ]);
      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Herbal Tea", -1, 50),
      ]);
    });
  });

  describe("Fervex", () => {
    it("should increase the benefit", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 15, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 14, 10)]);
    });

    it("should increase the benefit twice as fast when the expiresIn is <= 10", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 9, 11)]);
    });

    it("should increase the benefit thrice as fast when the expiresIn is <= 5", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 4, 12)]);
    });

    it("should set the benefit to 0 when the expiresIn is over", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });
  });

  describe("Dafalgan", () => {
    it("should decrease the benefit twice as fast", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 42, 9)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", 41, 7)]);
    });

    it("should decrease the benefit 4 times as fast when the expiresIn is over", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 0, 8)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", -1, 4)]);
    });
  });
});
