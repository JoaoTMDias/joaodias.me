/**
 * Accessibility Rules
 *
 * @author João Dias (contacto@joaodias.me)
 * @since 1.0.0
 */

module.exports = {
	rules: {
		"jsx-a11y/href-no-hash": "off",
		"jsx-a11y/anchor-is-valid": [
			"warn",
			{
				aspects: ["invalidHref"],
			},
		],
		"jsx-a11y/label-has-for": 0,
	},
};
