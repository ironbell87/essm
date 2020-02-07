$(document).ready(function () {
    // show principal stress simulation results
    $("#principal_stress_simulation_submit").click(function () {
        var i, j;
        var i_str = ["a", "b", "c", "d", "e"], j_str = ["A", "B", "C", "D", "E", "F", "G"];

        // show member force
        var L = parseFloat($("#L").val());
        var P = parseFloat($("#P").val());
        var V = P / 2;
        var M = V * (L / 2);
        for (j = 0; j < j_str.length; j++) {
            $("#V_" + j_str[j]).val(P / 2);
            $("#M_" + j_str[j]).val(M * (j / 6));
        }

        // show properties of section, i.e., G, I, and y
        var b = parseFloat($("#b").val());
        var h = parseFloat($("#h").val());
        var I = b * Math.pow(h, 3) / 12;
        for (i = 0; i < i_str.length; i++) {
            var y = h / 2 * (i / 4);
            $("#y_" + i_str[i]).val(y);
            $("#G_" + i_str[i]).val(b * (h / 2 - y) * (y + (h / 2 - y) / 2));
            $("#I_" + i_str[i]).val(I);
        }

        // show shear stress
        var b = parseFloat($("#b").val());
        var id_str = "#tau_";
        for (i = 0; i < i_str.length; i++) { // A, B, ..., G
            var I = parseFloat($("#I_" + i_str[i]).val());
            var G = parseFloat($("#G_" + i_str[i]).val());
            for (j = 0; j < j_str.length; j++) { // a, b, ..., e
                var V = parseFloat($("#V_" + j_str[j]).val()) * 1000; // 1000 : kN => N
                var tau = V * G / (I * b);
                cur_id_str = id_str + i_str[i] + j_str[j];
                $(cur_id_str).val(tau);
            }
        }

        // show bending stress
        var id_str = "#sigma_";
        for (i = 0; i < i_str.length; i++) { // A, B, ..., G
            var I = parseFloat($("#I_" + i_str[i]).val());
            var y = parseFloat($("#y_" + i_str[i]).val());
            for (j = 0; j < j_str.length; j++) { // a, b, ..., e
                var M = parseFloat($("#M_" + j_str[j]).val());
                var sigma = M * y / I * 1000000; // 1000000 : kNm => Nmm;
                cur_id_str = id_str + i_str[i] + j_str[j];
                $(cur_id_str).val(sigma);
            }
        }

        // disable input buttons
        var m_input_id = ["L", "b", "h", "P"];
        var m_submit = $(this);
        var m_span = m_submit.next();
        disable_input_buttons(m_input_id, m_submit, m_span);
    });

    // show truss simulation results
    $("#truss_simulation_submit").click(function () {
        var i, j;
        var i_str = ["A", "B", "C", "D", "E", "F", "G", "H"], j_str = ["x", "y"];
        var disp = [[4.76190, -8.80251], [2.85714, -13.00653], [0.95238, -8.80251], [0.00000, -0.00000],
            [1.42857, -8.80251], [2.85714, -12.05415], [4.28571, -8.80251], [5.71429, -0.00000]]; // calculated nodal displacement

        var L = parseFloat($("#L").val()); // m
        var A = parseFloat($("#A").val()); // mm2
        var E = parseFloat($("#E").val()); // MPa
        var P = parseFloat($("#P").val()); // kN
        for (i = 0; i < i_str.length; i++) { // A, B, ..., G, H
            for (j = 0; j < j_str.length; j++) { // x, y
                disp[i][j] *= (P / 10) * (L / 1) * (100 / A) * (210000 / E);
                cur_id_str = "#" + i_str[i] + "_" + j_str[j];
                $(cur_id_str).val(disp[i][j]);
            }
        }

        // disable input buttons
        var m_input_id = ["L", "A", "E", "P"];
        var m_submit = $(this);
        var m_span = m_submit.next();
        disable_input_buttons(m_input_id, m_submit, m_span);
    });
});

// disable input buttons
function disable_input_buttons(p_input_id, p_submit, p_span) {
    var i;
    for (i = 0; i < p_input_id.length; i++) {
        $("#" + p_input_id[i]).prop("disabled", true);
    }
    p_submit.prop("disabled", true);
    p_submit.css("background-color", "#ff6f6f"); // change the color of submit button
    p_submit.css("cursor", "default"); // change the color of submit button
    //p_span.text("Simulation completed successfully! Press F5 to retry."); // change the text of submit span
    p_span.text("모의실험 완료! 다시 하려면 F5 누르기"); // change the text of submit span
    p_span.css("color", "#ff6f6f"); // change the color of submit span
}